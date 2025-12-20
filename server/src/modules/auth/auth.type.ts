import type z from "zod/v4";
import type { signupSchema } from "./auth.validation.js";
import type { SuccessResponse } from "../../utils/constant.js";
import type { Role } from "../../../generated/prisma/enums.js";

export type Signup = z.infer<typeof signupSchema>

export type LoginSuccessResponse = SuccessResponse & {
    userData: {
        role: Role,
        name: string,
        email: string,
        country_id: number | null
        id: number
    }
}