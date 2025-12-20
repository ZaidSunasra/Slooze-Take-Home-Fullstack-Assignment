import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { addUser, comparePassword, findExistingEmail } from "./auth.service.js";
import { cookieOptions, type ErrorResponse, type SuccessResponse } from "../../utils/constant.js";
import type { LoginSuccessResponse } from "./auth.type.js";

export const signupController = async (req: Request, res: Response<SuccessResponse | ErrorResponse>): Promise<any> => {

    const { name, email, password, role, country_id } = req.body;

    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }
    
    try {
        const isEmailAvailable = await findExistingEmail(email);
        if ( isEmailAvailable) {
            return res.status(400).json({
                message: "Email already registered",
            })
        }
        await addUser({ name, email, password, country_id, role })
        return res.status(200).json({
            message: "Account created successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const loginController = async (req: Request, res: Response<LoginSuccessResponse | ErrorResponse>): Promise<any> => {

    const { email, password } = req.body;

    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }
    try {
        const user = await findExistingEmail(email);
        if (!user) {
            return res.status(400).json({
                message: "Email not found. Enter correct email",
            });
        }
        const verifyPassword = await comparePassword(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }
        const token = jwt.sign(
            {
                email: email,
                id: user.id,
                role: user.role,
                name: user.name,
                country_id: user.country_id
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        res.cookie("Token", token, cookieOptions)
        return res.status(200).json({
            message: "Login successful",
            userData: {
                role: user.role,
                name: user.name,
                email: user.email,
                country_id: user.country_id,
                id: user.id
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const logoutController = (req: Request, res: Response<SuccessResponse>): any => {
    try {
        res.clearCookie("Token");
        return res.status(200).send({
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
        });
    }
}