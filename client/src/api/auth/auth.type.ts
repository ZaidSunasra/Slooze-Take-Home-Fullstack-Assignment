import type { SuccessResponse } from "@/lib/globalType"
import z from "zod/v4"

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type LoginUser = z.infer<typeof loginSchema>

export type LoginSuccessResponse = SuccessResponse & {
    userData: {
        role: "admin" | "manager" | "member",
        name: string,
        email: string,
        country_id: number | null
        id: number
    }
}