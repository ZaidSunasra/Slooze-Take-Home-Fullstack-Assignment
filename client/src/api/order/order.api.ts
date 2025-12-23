import type { SuccessResponse } from "@/lib/globalType";
import axiosInstance from "../axiosInstance";
import type { AddOrderPayload, GetOrderSuccessResponse } from "./order.type";

export const getOrders = async (): Promise<GetOrderSuccessResponse> => {
    const response = await axiosInstance.get(`/order/all`);
    return response.data;
};

export const addOrder = async (data: AddOrderPayload): Promise<SuccessResponse> => {
    const response = await axiosInstance.post(`/order/add`, data);
    return response.data;
};

export const cancelOrder = async (id : string): Promise<SuccessResponse> => {
    const response = await axiosInstance.patch(`/order/cancel/${id}`);
    return response.data;
};

export const placeOrder = async (id : string): Promise<SuccessResponse> => {
    const response = await axiosInstance.patch(`/order/place/${id}`);
    return response.data;
};