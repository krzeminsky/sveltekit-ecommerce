import type { Product } from "$lib/types";
import { db } from "./database";

export function getProducts(count: number, page: number) {
    return db.prepare("SELECT * FROM product LIMIT ? OFFSET ?").all(count, count * page) as Product[];
}