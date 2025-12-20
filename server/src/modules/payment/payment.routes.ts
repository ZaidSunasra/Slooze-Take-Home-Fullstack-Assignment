import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import checkRole from "../../middleware/role.middleware.js";
import { addPaymentController, editPaymentController, getAllPaymentController } from "./payment.controller.js";

export const paymentRouter = express.Router();

paymentRouter.post("/add", authMiddleware, checkRole("add_payment"), addPaymentController);
paymentRouter.get("/all", authMiddleware, getAllPaymentController);
paymentRouter.put("/edit/:id", authMiddleware, checkRole("edit_payment"), editPaymentController);