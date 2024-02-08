import type { Product, ProductFetchOptions, ProductRecord, ProductVariant } from "$lib/types/product";
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

export function fetchProducts(count: number, page: number, options?: ProductFetchOptions) {
    let products = Array.from(productsCache.values());

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
            } else {
                products.sort((a, b) => {
                    if (a.product.price > b.product.price) return -1 * inverse;
                    if (a.product.price < b.product.price) return 1 * inverse;
                    return 0;
                });
            }
        }
    }

    return products.slice(count * page, count);
}

export function getProductById(id: number) {
    return productsCache.get(id);
}

export function getProductCategories() {
    return db.prepare("SELECT DISTINCT category FROM product").pluck(true).all() as string[];
}