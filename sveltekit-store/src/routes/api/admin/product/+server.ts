import { updateProductSchema } from '$lib/server/validation/update-product-schema.js';
import { error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const data = await request.json();
    
    try {
        const parsedData = updateProductSchema.parse(data);
    } catch {
        return error(400);
    }
    
    return new Response();
}