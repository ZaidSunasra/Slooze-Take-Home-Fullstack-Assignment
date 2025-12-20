import "dotenv/config";
import type { Role } from "../../generated/prisma/enums.js";

export const URL = process.env["URL"]
export const PORT = process.env["PORT"]

export const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" as "none" | "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
}

export type SuccessResponse = {
    message: string
};

export type ErrorResponse = {
    message: string
    error?: any
}

export type Author = {
    id: number
    role: Role
    email: string
    name: string
    country_id: number
}