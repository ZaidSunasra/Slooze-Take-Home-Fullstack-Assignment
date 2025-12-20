import express from "express";
import { getItemsByRestaurantIdController, getRestaurantController } from "./restaurant.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export const restaurantRouter = express.Router();

restaurantRouter.get("/all", authMiddleware, getRestaurantController);
restaurantRouter.get("/dishes/:id", authMiddleware, getItemsByRestaurantIdController)