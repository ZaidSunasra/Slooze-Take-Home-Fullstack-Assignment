import axiosInstance from "../axiosInstance";
import type { GetRestaurantSuccessResponse } from "./restaurant.type";

export const getRestaurantDetail = async (): Promise<GetRestaurantSuccessResponse> => {
	const response = await axiosInstance.get(`/restaurant/all`);
	return response.data;
};