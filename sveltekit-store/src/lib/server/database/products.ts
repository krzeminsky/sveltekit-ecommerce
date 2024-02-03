import type { Product } from "$lib/types";
import { db } from "./database";

export function getProducts(count: number, page: number) {
    return db.prepare("SELECT * FROM product LIMIT ? OFFSET ?").all(count, count * page) as Product[];
}

export function getProductById(id: number) {
    return db.prepare("SELECT * FROM product WHERE id = ?").get(id) as Product;
}

export function getAllProducts() {
    return db.prepare("SELECT * FROM product").all() as Product[];
}

export function getProductCategories() {
    return db.prepare("SELECT DISTINCT category FROM product WHERE category IS NOT NULL").pluck(true).all() as string[];
}