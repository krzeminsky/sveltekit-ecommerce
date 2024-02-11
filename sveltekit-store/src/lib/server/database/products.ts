import type { Product, ProductRecord, ProductVariant } from "$lib/types/product";
import type { ProductFetchOptions } from "$lib/validation/get-product-schema";
import type { ProductData } from "../validation/update-product-schema";
import { db } from "./database";

const productsCache = new Map<number, ProductRecord>();

const restoreProductsCache = db.transaction(() => {
    const products = db.prepare("SELECT * FROM product").all() as Product[];
    const getVariantsQuery = db.prepare("SELEcT * FROM product_variant WHERE product_id = ?");

    for (const p of products) {
        productsCache.set(p.id, { product: p, variants: getVariantsQuery.all(p.id) as ProductVariant[] });
    }
});

restoreProductsCache();

function any<T>(arr: T[], predicate: (item: T) => boolean) {
    for (const i of arr) {
        if (predicate(i)) return true;
    }

    return false;
}

function includesAny(val: string, search: string[]) {
    for (const s of search) {
        if (val.includes(s)) return true;
    }

    return false;
}

export function fetchProducts(count: number, page: number, fetchOptions?: ProductFetchOptions) {
    let products = Array.from(productsCache.values());
    const options = fetchOptions?.options;
    
    if (options) {
        if (options.priceRange) {
            const range = options.priceRange!;
            products = products.filter(r => r.product.price >= range.start && r.product.price <= range.end);
        }
        
        if (options.categories && options.categories.length > 0) {
            products = products.filter(r => options.categories!.includes(r.product.category));
        }
        
        if (options.materials && options.materials.length > 0) {
            products = products.filter(r => {
                for (const m of options.materials!) {
                    if (r.product.materials.includes(m)) return true;
                }

                return false;
            })
        }

        if (options.name) {
            products = products.filter(r => r.product.name.includes(options.name!));
        }

        if (options.variantSearchOptions) {
            const variantSearchOptions = options.variantSearchOptions!;

            if (variantSearchOptions.sizes && variantSearchOptions.sizes.length > 0) {
                products = products.filter(r => any(r.variants, v => includesAny(v.stock_map, variantSearchOptions.sizes!)));
            }

            if (variantSearchOptions.colors && variantSearchOptions.colors.length > 0) {
                products = products.filter(r => any(r.variants, v => variantSearchOptions.colors!.includes(v.color)));
            }
        }

        if (options.sortOptions) {
            const inverse = options.sortOptions.descending? 1 : -1;

            if (options.sortOptions.sortBy == "Name") {
                products.sort((a, b) => {
                    if (a.product.name < b.product.name) return -1 * inverse;
                    if (a.product.name > b.product.name) return 1 * inverse;
                    return 0;
                });
            } else if (options.sortOptions.sortBy == "Price") {           
                products.sort((a, b) => {
                    if (a.product.price > b.product.price) return -1 * inverse;
                    if (a.product.price < b.product.price) return 1 * inverse;
                    return 0;
                });
            } else if (options.sortOptions.descending) {
                products.reverse();
            }
        }
    }

    return products.slice(count * page, page + count);
}

export function getProductById(id: number) {
    return productsCache.get(id);
}

export function getProductCategories() {
    return db.prepare("SELECT DISTINCT category FROM product").pluck(true).all() as string[];
}


const insertVariantStmnt = db.prepare("INSERT INTO product_variant VALUES(NULL, ?, ?, ?)");

const insertProductTransaction = db.transaction((data: ProductData) => {
    const productId = db.prepare("INSERT INTO product VALUES(NULL, $name, $price, $description, $category, $materials)").run(data).lastInsertRowid as number;

    data.id = productId;

    updateProductCache(data);

    return productId;
});

export function insertProduct(data: ProductData) {
    return insertProductTransaction(data);
}


const updateProductTransaction = db.transaction((data: ProductData) => {
    db.prepare("UPDATE product SET name = $name, price = $price, description = $description, category = $category, materials = $materials WHERE id = $id").run(data);

    // ? approach 1: go through existing variants and delete/update accordingly
    // ? approach 2: deleteing existing variants and insert new ones
    // ? we'll be going with approach 2 because it's simpler

    db.prepare("DELETE FROM product_variant WHERE product_id = ?").run(data.id);

    updateProductCache(data);
})

function updateProductCache(data: ProductData) {
    const variants: ProductVariant[] = [];
    data.variants.forEach(v => {
        const stockMap = JSON.stringify(v.stock);
        const variantId = insertVariantStmnt.run(data.id, v.color, stockMap).lastInsertRowid as number;
        
        variants.push({ id: variantId, color: v.color, product_id: data.id, stock_map: stockMap });
    });

    const record = { product: { id: data.id, category: data.category, description: data.description, materials: data.materials, name: data.name, price: data.price }, variants } as ProductRecord;

    productsCache.set(data.id, record);
}

export function updateProduct(data: ProductData) {
    updateProductTransaction(data);
}

export function deleteProduct(id: number) {
    db.prepare("DELETE FROM product WHERE id = ?").run(id);
    productsCache.delete(id);
}

export function getProductCount() {
    return productsCache.size;
}