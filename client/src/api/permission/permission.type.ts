import type { role, SuccessResponse } from "@/lib/globalType";

export type Permission = {
    name: string;
    id: number;
    allowed_roles: role[];
}

export type GetAllPermissionSuccessResponse = SuccessResponse & {
    permissions: Permission[] | null;
}