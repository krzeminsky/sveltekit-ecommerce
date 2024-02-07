import { getProductById } from '$lib/server/database/products.js';
import { type ProductRecord } from '$lib/types/product.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const id = Number(params.id);

    const productRecord = id == -1? { product: { id: -1, category: '', materials: '', description: '', name: '', price: 0 }, variants: [] } as ProductRecord : getProductById(id);
    if (!productRecord) throw error(404, "Product not found");

    return { productRecord }
}