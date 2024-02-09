import { insertProduct, updateProduct } from "$lib/server/database/products";
import { updateProductSchema } from "$lib/server/validation/update-product-schema";
import { error, redirect } from "@sveltejs/kit";

export const POST = async ({ request }) => {
    const data = await request.json();

    const parsedData = updateProductSchema.safeParse(data);

    if (!parsedData.success) {
        throw error(400);
    }

    if (parsedData.data.id < 0) {
        const newProductId = insertProduct(parsedData.data);

        throw redirect(302, `/admin/products/${newProductId}`);
    } else updateProduct(parsedData.data);
    
    return new Response(undefined, { status: 200 });
}