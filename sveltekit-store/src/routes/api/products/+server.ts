import { getProducts } from '$lib/server/database/products';
import { error } from '@sveltejs/kit';

export const GET = async ({ request }) => {
    const { count, page } = await request.json() as { count: number, page: number };

    if (isNaN(count) || isNaN(page)) return error(400);

    return new Response(JSON.stringify(getProducts(count, page)));
}