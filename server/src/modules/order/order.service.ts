import { prisma } from "../../libs/prisma.js";
import type { Author } from "../../utils/constant.js";
import type { AddOrder, GetOrder } from "./order.type";

export const addOrderService = async ({ total_amount, items, country_id, restaurant_id}: AddOrder, author: Author): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        const order = await tx.cart.create({
            data: {
                total_amount,
                country_id,
                user_id: author.id,
                restaurant_id,
                status: author.role === "member" ? "draft" : "placed",
            },
            select: {
                id: true
            }
        });
        await tx.cartItem.createMany({
            data: items.map((item) => ({
                cart_id: order.id,
                item_id: item.item_id,
                price: item.price,
                quantity: item.quantity,
            }))
        })
    })
}

export const cancelOrderService = async (order_id : string) : Promise<void> => {
    await prisma.cart.update({
        where: {
            id: parseInt(order_id)
        },
        data: {
            status: "cancelled"
        }
    }) 
}

export const placeOrderService = async (order_id : string) : Promise<void> => {
    await prisma.cart.update({
        where: {
            id: parseInt(order_id)
        },
        data: {
            status: "placed"
        }
    }) 
}

export const getAllOrdersService = async (author : Author) : Promise<GetOrder | null> => {
    const orders = await prisma.cart.findMany({
        where: author.role == "admin" ? {} : {
            country_id : author.country_id
        },
        include: {
            items: true
        }
    });
    return orders;
}