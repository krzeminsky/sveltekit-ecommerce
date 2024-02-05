import { getProductCategories } from '$lib/server/database/products.js'

export const load = async ({}) => {
    return { categories: getProductCategories() }
}