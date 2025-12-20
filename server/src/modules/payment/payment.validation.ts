import z from "zod/v4";
import { Payment_Mode } from "../../../generated/prisma/enums.js";

export const addPaymentSchema = z.object({
    type: z.enum(Payment_Mode),
    expiry_year: z.string().optional().nullable(),
    expiry_date: z.string().optional().nullable(),
    upi_id: z.string().optional().nullable(),
    card_number: z.string().optional().nullable(),
    phone_number: z.string().optional().nullable(),
})