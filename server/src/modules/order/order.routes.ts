import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { addOrderController, cancelOrderController, getAllOrdersContoller, placeOrderController } from "./order.controller.js";
import checkRole from "../../middleware/role.middleware.js";


export const orderRouter = express.Router();

orderRouter.post("/add", authMiddleware, checkRole("add_order"), addOrderController);
orderRouter.patch("/cancel/:id", authMiddleware, checkRole("cancel_order"), cancelOrderController);
orderRouter.patch("/place/:id", authMiddleware, checkRole("place_order"), placeOrderController);
orderRouter.get("/all", authMiddleware, getAllOrdersContoller);