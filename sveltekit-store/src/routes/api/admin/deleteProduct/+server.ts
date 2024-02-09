import { deleteProduct } from '$lib/server/database/products.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const id = Number(await request.text());

    deleteProduct(id);

    throw redirect(302, "/admin/products");
}