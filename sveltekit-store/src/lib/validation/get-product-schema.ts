import z from "zod";

export const getProductSchema = z.object({
    count: z.number().min(0).max(10),
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
            sortBy: z.literal("Price").or(z.literal("Name")),
            descending: z.boolean()
        })
    })
})