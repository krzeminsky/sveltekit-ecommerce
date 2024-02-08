import { z } from 'zod';

export const updateProductSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    price: z.number(),
    description: z.string().min(1),
    category: z.string().min(1),
    materials: z.string().min(1),

    variants: z.array(z.object({
        id: z.number(),
        color: z.string().min(1),
        stock: z.array(z.object({
            size: z.string().min(1),
            amount: z.number()
        }))
    }))
});