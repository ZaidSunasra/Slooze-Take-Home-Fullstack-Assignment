import express from "express";
import { loginController, logoutController, signupController } from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authMiddleware, logoutController);

export default authRouter;

