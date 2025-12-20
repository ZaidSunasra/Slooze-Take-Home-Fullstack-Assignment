import z from "zod/v4"
import { Role } from "../../../generated/prisma/enums.js"

export const signupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(Role),
    country_id: z.number().optional().nullable()
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})