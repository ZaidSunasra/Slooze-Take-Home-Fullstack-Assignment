import express from "express";
import authRouter from "../modules/auth/auth.routes.js";
import { restaurantRouter } from "../modules/restaurant/restaurant.routes.js";
import { orderRouter } from "../modules/order/order.routes.js";
import { paymentRouter } from "../modules/payment/payment.routes.js";
import { permissionRouter } from "../modules/permission/permission.routes.js";

export const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/restaurant", restaurantRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/permission", permissionRouter);