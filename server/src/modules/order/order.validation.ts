import z from "zod/v4";

export const orderItems = z.object({
    item_id: z.number(),
    price: z.number(),
    quantity: z.number()
});

export const addOrderSchema = z.object({
    total_amount: z.number(),
    items: z.array(orderItems),
    country_id: z.number(),
    restaurant_id: z.number()
})