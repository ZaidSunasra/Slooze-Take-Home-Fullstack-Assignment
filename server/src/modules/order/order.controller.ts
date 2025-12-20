import type { Request, Response } from "express";
import { addOrderSchema } from "./order.validation.js";
import { addOrderService, cancelOrderService, getAllOrdersService, placeOrderService } from "./order.service.js";
import type { ErrorResponse, SuccessResponse } from "../../utils/constant.js";
import type { GetOrderSuccessResponse } from "./order.type.js";

export const addOrderController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const { total_amount, items, country_id, restaurant_id} = req.body;
    const author = res.locals.user

    const validation = addOrderSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }

    try {
        await addOrderService({ total_amount, items, country_id, restaurant_id}, author);
        return res.status(200).json({
            message: "Order added successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const cancelOrderController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const order_id = req.params.id;

    try {
        await cancelOrderService(order_id as string);
        return res.status(200).json({
            message: "Order cancelled successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const placeOrderController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const order_id = req.params.id;

    try {
        await placeOrderService(order_id as string);
        return res.status(200).json({
            message: "Order placed successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const getAllOrdersContoller = async (req: Request, res: Response<GetOrderSuccessResponse | ErrorResponse>): Promise<any> => {

    const author = res.locals.user;

    try {
        const orders = await getAllOrdersService(author);
        return res.status(200).json({
            orders,
            message: "Order fetched successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}