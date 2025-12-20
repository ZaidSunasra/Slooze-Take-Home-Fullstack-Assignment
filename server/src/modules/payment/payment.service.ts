import type { Payment } from "../../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import type { AddPayment } from "./payment.type.js";

export const addPaymentService = async ({type, expiry_date, expiry_year, upi_id, phone_number, card_number} : AddPayment) : Promise<void> => {
    await prisma.payment.create({
        data: {
            type,
            expiry_date: expiry_date ?? null,
            expiry_year: expiry_year ?? null,
            card_number: card_number ?? null,
            phone_number: phone_number ?? null,
            upi_id: upi_id ?? null
        }
    });
}

export const getAllPaymentService = async () : Promise<Payment[] | null> => {
    const payments = await prisma.payment.findMany({});
    return payments
}

export const editPaymentService = async ({type, expiry_date, expiry_year, upi_id, phone_number, card_number} : AddPayment, payment_id: string) : Promise<void> => {
    await prisma.payment.update({
        where: {
            id: parseInt(payment_id)
        },
        data: {
            type,
            expiry_date: expiry_date ?? null,
            expiry_year: expiry_year ?? null,
            card_number: card_number ?? null,
            phone_number: phone_number ?? null,
            upi_id: upi_id ?? null
        }
    });
}