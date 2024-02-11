import { error } from '@sveltejs/kit';
import { fetchProductSchema } from '$lib/validation/get-product-schema.js';
import { fetchProducts } from '$lib/server/database/products.js';

export const GET = async ({ url }) => {
    const queryString = url.searchParams.get('query');
    if (!queryString) return error(400);

    const data = JSON.parse(queryString);
    
    try {
        const parsedData = fetchProductSchema.parse(data);
        
        return new Response(JSON.stringify(fetchProducts(parsedData.count, parsedData.page, parsedData)));
    } catch {
        return error(400);
    }
}