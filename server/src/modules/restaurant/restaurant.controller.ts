import type { Request, Response } from "express";
import {  getItemsByRestaurantIdService, getRestaurantService } from "./restaurant.service.js";
import type { GetItemsByRestaurantSuccessResponse, GetRestaurantSuccessResponse } from "./restaurant.type.js";
import type { ErrorResponse } from "../../utils/constant.js";

export const getRestaurantController = async (req: Request, res: Response<GetRestaurantSuccessResponse | ErrorResponse>): Promise<any> => {

    const author = res.locals.user;
    try {
        const restaurants = await getRestaurantService(author);
        return res.status(200).send({
            restaurants,
            message: "Restaurant fetched successfully",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error in getting restaurant",
        });
    }
}

export const getItemsByRestaurantIdController = async (req: Request, res: Response<GetItemsByRestaurantSuccessResponse | ErrorResponse>): Promise<any> => {

    const restaurant_id = req.params.id;
    try {
        const items = await getItemsByRestaurantIdService(restaurant_id as string);
        return res.status(200).send({
            items,
            message: "Items fetched successfully",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error in getting items",
        });
    }
}