import { getProductById } from '$lib/server/database/products.js';

export const load = async ({ params }) => {
    const id = Number(params.id);
    
    return { product: id === -1? undefined : getProductById(id) }
}