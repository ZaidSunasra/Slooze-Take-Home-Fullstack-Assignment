import type { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../libs/prisma.js";

const checkRole = (permissionKey?: string): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const user = res.locals.user;

            if (permissionKey) {
              
                const permissions = await prisma.permission.findMany({
                    where: { name: permissionKey},
                });

                if (permissions.length === 0) {
                    return res.status(404).json({ message: "Permissions not found" });
                }

                const hasAccess = permissions.some((perm) =>
                    perm.allowed_roles.includes(user.role)
                );

                if (hasAccess) return next();

                return res.status(403).json({ message: "Access denied: permission not allowed" });
            }

            return res.status(403).json({ message: "No permission configuration found" });
        } catch (error) {
            console.error("Error checking permission:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};

export default checkRole;
