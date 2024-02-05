import { getProductById } from '$lib/server/database/products.js';
import { type ProductRecord } from '$lib/types/product.js';

export const load = async ({ params }) => {
    const id = Number(params.id);

    return { product: id == -1? { product: { id: -1, category: '', materials: '', name: '', price: 0 }, variants: [] } as ProductRecord : getProductById(id) }
}