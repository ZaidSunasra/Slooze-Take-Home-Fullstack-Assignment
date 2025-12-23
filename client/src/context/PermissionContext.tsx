import { FetchPermissions } from "@/api/permission/permission.queries";
import type { Permission } from "@/api/permission/permission.type";
import type { role } from "@/lib/globalType";
import { createContext, useContext, type ReactNode } from "react";

type PermissionContextType = {
    permissions: Permission[];
    isLoading: boolean,
    canView: (userRole: role, name: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = FetchPermissions();
    const permissions = data?.permissions ?? [];
    const canView = (userRole: role, name: string) => {
        const permission = permissions.find((p: Permission) => p.name === name);
        if (!permission) return false;
        return permission.allowed_roles.includes(userRole);
    };
    return <PermissionContext.Provider value={{ permissions, isLoading, canView }}>
        {children}
    </PermissionContext.Provider>;
};

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) throw new Error("Must be used inside PermissionProvider");
    return context;
};
