import type { ErrorResponse, SuccessResponse } from "@/lib/globalType";
import { toast } from "sonner";
import { addPayment, editPayment } from "./payment.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addPayment,
        onSuccess: (data: SuccessResponse) => {
            queryClient.invalidateQueries({queryKey: ['payments']})
            toast.success(data.message)
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useEditPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editPayment,
        onSuccess: (data: SuccessResponse) => {
            queryClient.invalidateQueries({queryKey: ['payments']})
            toast.success(data.message)
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data.message);
        }
    });
};