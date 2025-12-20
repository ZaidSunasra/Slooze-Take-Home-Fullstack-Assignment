import type z from "zod/v4";
import type { addPaymentSchema } from "./payment.validation.js";
import type { SuccessResponse } from "../../utils/constant.js";
import type { Payment } from "../../../generated/prisma/client.js";

export type AddPayment = z.infer<typeof addPaymentSchema>;

export type GetAllPaymentSuccessResponse = SuccessResponse & {
    payments: Payment[] | null
}