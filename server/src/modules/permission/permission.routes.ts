import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getAllPermissionController } from "./permission.controller.js";

export const permissionRouter = express.Router();

permissionRouter.get("/all", authMiddleware, getAllPermissionController);