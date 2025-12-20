import type { Permission } from "../../../generated/prisma/client.js";
import type { SuccessResponse } from "../../utils/constant.js";

export type GetAllPermissionSuccessResponse = SuccessResponse & {
    permissions: Permission[] | null;
}