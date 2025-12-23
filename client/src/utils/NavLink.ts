import type { role } from "@/lib/globalType";
import { ClipboardList, CreditCard, ShoppingCart, Store, type LucideIcon } from "lucide-react";

export const navItems: Record<role, { url: string, title: string, icon: LucideIcon }[]> = {
    admin: [
        { title: "Restaurant", url: "/restaurants", icon: Store },
        { title: "Cart", url: "/cart", icon: ShoppingCart },
        { title: "Orders", url: "/orders", icon: ClipboardList },
        { title: "Payment", url: "/payment", icon: CreditCard }
    ],
    manager: [
        { title: "Restaurant", url: "/restaurants", icon: Store },
        { title: "Cart", url: "/cart", icon: ShoppingCart },
        { title: "Orders", url: "/orders", icon: ClipboardList },
    ],
    member: [
        { title: "Restaurant", url: "/restaurants", icon: Store },
        { title: "Cart", url: "/cart", icon: ShoppingCart },
        { title: "Orders", url: "/orders", icon: ClipboardList },
    ]
} as const;