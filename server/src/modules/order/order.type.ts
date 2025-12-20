import type z from "zod/v4";
import type { addOrderSchema } from "./order.validation";
import type { Cart, CartItem } from "../../../generated/prisma/client";
import type { SuccessResponse } from "../../utils/constant";

export type AddOrder = z.infer<typeof addOrderSchema>

export type GetOrder = (Cart & {
    items: CartItem[]
})[]

export type GetOrderSuccessResponse = SuccessResponse & {
    orders: GetOrder | null
}