import type { ErrorResponse, SuccessResponse } from "../../utils/constant.js";
import { addPaymentService, editPaymentService, getAllPaymentService } from "./payment.service.js";
import type { GetAllPaymentSuccessResponse } from "./payment.type.js";
import { addPaymentSchema } from "./payment.validation.js";
import type { Response, Request } from "express";

export const addPaymentController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const { type, expiry_year, expiry_date, phone_number, upi_id, card_number } = req.body;

    const validation = addPaymentSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }

    try {
        await addPaymentService({ type, expiry_date, expiry_year, upi_id, phone_number, card_number });
        return res.status(200).json({
            message: "Payment mode added successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const getAllPaymentController = async (req: Request, res: Response<GetAllPaymentSuccessResponse | ErrorResponse>): Promise<any> => {

    try {
        const payments = await getAllPaymentService();
        return res.status(200).json({
            payments,
            message: "Payments fetched successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const editPaymentController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const { type, expiry_year, expiry_date, phone_number, upi_id, card_number } = req.body;
    const payment_id = req.params.id;

    const validation = addPaymentSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }

    try {
        await editPaymentService({ type, expiry_date, expiry_year, upi_id, phone_number, card_number }, payment_id as string);
        return res.status(200).json({
            message: "Payment details edited successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}