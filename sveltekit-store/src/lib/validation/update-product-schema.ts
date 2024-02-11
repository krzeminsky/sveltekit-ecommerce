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

// * stringyfing 'stock' on client side might be a viable option in the future
// * not sure why past me wanted this to be an array so it will stay this way until I remeber why I wrote it this way lmao

export type ProductData = z.infer<typeof updateProductSchema>;