import type { cart_status, SuccessResponse } from "@/lib/globalType";
import { z } from "zod/v4";

export const cartItems = z.object({
    item_id: z.number(),
    price: z.number(),
    quantity: z.number(),
    name: z.string()
});

export const orderItems = z.object({
    item_id: z.number(),
    price: z.number(),
    quantity: z.number(),
})

export const addOrderSchema = z.object({
    total_amount: z.number(),
    items: z.array(orderItems),
    country_id: z.number(),
    restaurant_id: z.number(),
});

export type CartItem = z.infer<typeof cartItems>;
export type OrderItem = z.infer<typeof orderItems>;
export type AddOrderPayload = z.infer<typeof addOrderSchema>;

export type Cart = {
    total_amount: number;
    country_id: number;
    restaurant_id: number;
    id: number;
    user_id: number;
    status: cart_status;
    created_at: Date;
}

export type CartItemDb = {
    item_id: number;
    price: number;
    quantity: number;
    id: number;
    cart_id: number;
} & {
    item: {
        name: string
    }
}

export type GetOrder = (Cart & {
    items: (CartItemDb)[],
    restaurant: { name: string },
    created_by: { name: string }
})[]

export type GetOrderSuccessResponse = SuccessResponse & {
    orders: GetOrder | null
}