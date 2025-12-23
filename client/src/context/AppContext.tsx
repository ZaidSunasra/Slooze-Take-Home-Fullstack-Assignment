import { type ReactNode } from "react"
import { UserProvider } from "./UserContext"
import { CartProvider } from "./CartContext"
import { PermissionProvider } from "./PermissionContext"

export const AppContext = ({ children }: { children: ReactNode }) => {
    return (
        <UserProvider>
            <PermissionProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </PermissionProvider>
        </UserProvider>
    )
}
