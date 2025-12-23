import axiosInstance from "../axiosInstance";
import type { GetAllPermissionSuccessResponse } from "./permission.type";

export const getPermissions = async (): Promise<GetAllPermissionSuccessResponse> => {
    const response = await axiosInstance.get(`/permission/all`);
    return response.data;
};