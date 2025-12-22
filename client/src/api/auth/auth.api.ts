import type { SuccessResponse } from "@/lib/globalType";
import axiosInstance from "../axiosInstance";
import type { LoginSuccessResponse, LoginUser } from "./auth.type";

export const login = async (data: LoginUser): Promise<LoginSuccessResponse> => {
	const response = await axiosInstance.post("/auth/login", data);
	return response.data;
};

export const logout = async (): Promise<SuccessResponse> => {
	const response = await axiosInstance.post("/auth/logout");
	return response.data;
};
