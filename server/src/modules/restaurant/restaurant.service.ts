import type { RestaurantItem } from "../../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js"
import type { Author } from "../../utils/constant.js"
import type { GetRestaurant } from "./restaurant.type.js";

export const getRestaurantService = async (author: Author): Promise<GetRestaurant | null> => {
    const restaurants = await prisma.restaurant.findMany({
        where: author.role == "admin" ? {} : {
            country_id: author.country_id
        },
        include: {
            items: true
        }
    });
    return restaurants
}

export const getItemsByRestaurantIdService = async (restaurant_id: string): Promise<RestaurantItem[] | null> => {
    const items = await prisma.restaurantItem.findMany({
        where:  {
            restaurant_id: parseInt(restaurant_id)
        }
    });
    return items
}
