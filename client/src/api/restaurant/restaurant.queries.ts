import { useQuery } from "@tanstack/react-query"
import { getRestaurantDetail } from "./restaurant.api"

export const FetchRestaurantDetail = () => {
    return useQuery({
        queryKey: ['restaurant-detail'],
        queryFn: getRestaurantDetail
    })
}