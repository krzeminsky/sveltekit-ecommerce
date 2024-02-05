export type Product = {
	id: number;
	name: string;
	price: number;
	category: string;
	materials: string;
};

export type ProductVariant = {
	id: number,
	product_id: number,
	color: string,
	size: string,
	amount: number
};

export type ProductFetchOptions = {
    name?: string,
    materials?: string[],
    categories?: string[], 

	variantSearchOptions?: {
		sizes?: string[],
		colors?: string[]
	},

    priceRange?: { start: number, end: number },
    sortOptions?: { sortBy: "Price"|"Name", descending: boolean }
};

export type ProductRecord = { product: Product, variants: ProductVariant[] };