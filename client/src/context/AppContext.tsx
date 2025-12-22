import { type ReactNode } from "react"
import { UserProvider } from "./UserContext"

export const AppContext = ({ children }: { children: ReactNode }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}
