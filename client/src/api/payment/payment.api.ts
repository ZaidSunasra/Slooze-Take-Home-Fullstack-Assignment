import type { SuccessResponse } from "@/lib/globalType";
import axiosInstance from "../axiosInstance";
import type { AddPayment, GetAllPaymentSuccessResponse } from "./payment.type";

export const getPayments = async (): Promise<GetAllPaymentSuccessResponse> => {
    const response = await axiosInstance.get(`/payment/all`);
    return response.data;
};

export const addPayment = async (data: AddPayment): Promise<SuccessResponse> => {
    const response = await axiosInstance.post(`/payment/add`, data);
    return response.data;
};

export const editPayment = async ({data, id} : {data: AddPayment, id: string}): Promise<SuccessResponse> => {
    const response = await axiosInstance.put(`/payment/edit/${id}`, data);
    return response.data;
};