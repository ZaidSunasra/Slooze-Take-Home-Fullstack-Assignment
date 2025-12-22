import type { role } from "@/lib/globalType";

export const navItems: Record<role, { url: string, title: string }[]> = {
    admin: [
        { title: "Restaurant", url: "/lead" },
        { title: "Cart", url: "/deal" },
        { title: "Orders", url: "/quotation" },
        { title: "Payment", url: "/order" }

    ],
    manager: [
        { title: "Restaurant", url: "/lead" },
        { title: "Cart", url: "/deal" },
        { title: "Orders", url: "/quotation" }
    ],
    member: [
        { title: "Restaurant", url: "/lead" },
        { title: "Cart", url: "/deal" },
        { title: "Orders", url: "/quotation" }
    ]
} as const;