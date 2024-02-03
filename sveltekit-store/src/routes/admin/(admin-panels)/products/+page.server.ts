import { getProductCategories, getProducts } from '$lib/server/database/products.js'

export const load = async ({  }) => {
    return { products: getProducts(5, 0), categories: getProductCategories() }
}