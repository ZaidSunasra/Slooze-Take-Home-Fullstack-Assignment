import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder, cancelOrder, placeOrder } from "./order.api";
import type { SuccessResponse, ErrorResponse } from "@/lib/globalType";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useAddOrder = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addOrder,
        onSuccess: (data: SuccessResponse) => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success(data.message);
            navigate("/orders");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: (data: SuccessResponse) => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success(data.message);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: placeOrder,
        onSuccess: (data: SuccessResponse) => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            toast.success(data.message);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};