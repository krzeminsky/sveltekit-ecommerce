import z from "zod";

export const fetchProductSchema = z.object({
    count: z.number().min(0).max(20),
    page: z.number().min(0),
    options: z.object({
        name: z.string().optional(),
        materials: z.string().array().optional(),
        categories: z.string().array().optional(),
        
        variantSearchOptions: z.object({
            sizes: z.string().array().optional(),
            colors: z.string().array().optional()
        }).optional(),

        priceRange: z.object({
            start: z.number(),
            end: z.number()
        }).optional(),

        sortOptions: z.object({
            sortBy: z.literal("Price").or(z.literal("Name").or(z.literal("Id"))),
            descending: z.boolean()
        }).optional()
    }).optional()
})

export type ProductFetchOptions = z.infer<typeof fetchProductSchema>;