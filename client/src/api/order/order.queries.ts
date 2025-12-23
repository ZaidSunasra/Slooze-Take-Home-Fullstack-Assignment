import { useQuery } from "@tanstack/react-query"
import { getOrders } from "./order.api"

export const FetchOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    })
}