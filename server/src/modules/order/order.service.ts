import { prisma } from "../../libs/prisma.js";
import type { Author } from "../../utils/constant.js";
import type { AddOrder, GetOrder } from "./order.type";

export const addOrderService = async ({ total_amount, items, country_id, restaurant_id, shared}: AddOrder, author: Author): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        const order = await tx.cart.create({
            data: {
                total_amount,
                country_id,
                user_id: author.id,
                restaurant_id,
                status: shared === "true" ? "shared" : author.role === "member" ? "draft" : "placed",
                is_shared: shared === "true" ? true : false
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
                user_id: item.user_id
            }))
        })
    })
}

export const editOrderService = async ({ total_amount, items, country_id, restaurant_id, shared}: AddOrder, author: Author, cart_id: string): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        await tx.cartItem.deleteMany({
            where: {
                cart_id: Number(cart_id)
            }
        })
        await tx.cartItem.createMany({
            data: items.map((item) => ({
                cart_id: Number(cart_id),
                item_id: item.item_id,
                price: item.price,
                quantity: item.quantity,
                user_id: item.user_id
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
            items: {
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    added_by: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            restaurant: {
                select: {
                    name: true
                }
            },
            created_by: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    });
    return orders;
}