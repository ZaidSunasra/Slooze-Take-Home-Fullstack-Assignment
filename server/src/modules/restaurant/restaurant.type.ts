import type { Restaurant, RestaurantItem } from "../../../generated/prisma/client.js";
import type { SuccessResponse } from "../../utils/constant.js";

export type GetRestaurant = (Restaurant & {
    items: RestaurantItem[]
})[]

export type GetRestaurantSuccessResponse = SuccessResponse & {
    restaurants : GetRestaurant | null
}

export type GetItemsByRestaurantSuccessResponse = SuccessResponse & {
    items: RestaurantItem[] | null
}