import { getProductById } from '$lib/server/database/products.js'

export const GET = async ({ url }) => {
    const id = Number(url.searchParams.get('id'));

    return new Response(JSON.stringify(getProductById(id)));
}