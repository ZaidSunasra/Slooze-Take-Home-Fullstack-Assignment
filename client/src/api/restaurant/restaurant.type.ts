import type { SuccessResponse } from "@/lib/globalType";

export type Restaurant = {
    name: string;
    id: number;
    country_id: number;
}

export type RestaurantItem = {
    name: string;
    id: number;
    price: number;
    restaurant_id: number;
}

export type GetRestaurant = (Restaurant & {
    items: RestaurantItem[]
})[]

export type GetRestaurantSuccessResponse = SuccessResponse & {
    restaurants : GetRestaurant | null
}