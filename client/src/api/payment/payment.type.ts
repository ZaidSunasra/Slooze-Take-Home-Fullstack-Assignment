import type { SuccessResponse } from "@/lib/globalType";
import z from "zod/v4";

export const Payment_Mode = ['upi', 'card', 'wallet'] as const
export type payment_mode = typeof Payment_Mode[number]

export const addPaymentSchema = z.object({
    type: z.enum(Payment_Mode),
    expiry_year: z.string().optional().nullable(),
    expiry_date: z.string().optional().nullable(),
    upi_id: z.string().optional().nullable(),
    card_number: z.string().optional().nullable(),
    phone_number: z.string().optional().nullable(),
})

export type Payment = {
    type: payment_mode;
    expiry_year: string | null;
    expiry_date: string | null;
    upi_id: string | null;
    card_number: string | null;
    phone_number: string | null;
    id: number;
}

export type AddPayment = z.infer<typeof addPaymentSchema>;

export type GetAllPaymentSuccessResponse = SuccessResponse & {
    payments: Payment[] | null
}