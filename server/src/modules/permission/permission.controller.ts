import type { Response, Request } from "express";
import { getAllPermissionService } from "./permission.service.js";
import type { GetAllPermissionSuccessResponse } from "./permission.type.js";
import type { ErrorResponse } from "../../utils/constant.js";

export const getAllPermissionController = async (req: Request, res: Response<GetAllPermissionSuccessResponse | ErrorResponse>): Promise<any> => {

    try {
        const permissions = await getAllPermissionService();
        return res.status(200).json({
            permissions,
            message: "Permissions fetched successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}
