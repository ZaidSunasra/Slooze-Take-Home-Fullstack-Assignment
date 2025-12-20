import type { Permission } from "../../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";

export const getAllPermissionService = async () : Promise<Permission[] | null> => {
    const permissions = await prisma.permission.findMany({});
    return permissions;
}