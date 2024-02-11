export type Product = {
	id: number;
	name: string;
	price: number;
	description: string; 
	category: string;
	materials: string;
};

export type ProductVariant = {
	id: number,
	product_id: number,
	color: string,
	stock_map: string;
};

export type ProductRecord = { product: Product, variants: ProductVariant[] };