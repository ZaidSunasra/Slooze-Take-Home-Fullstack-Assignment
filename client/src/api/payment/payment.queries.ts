import { useQuery } from "@tanstack/react-query"
import { getPayments } from "./payment.api"

export const FetchPayments = () => {
    return useQuery({
        queryKey: ['payments'],
        queryFn: getPayments
    })
}