import bcrypt from "bcryptjs"
import type { User } from "../../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import type { Signup } from "./auth.type.js";

export const hashPassword = async (password: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const compare = await bcrypt.compare(password, hashPassword);
    return compare;
}

export const findExistingEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    return user;
}

export const addUser = async ({ name, email, password, country_id, role }: Signup): Promise<void> => {
    await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPassword(password),
            role,
            country_id: country_id ?? null
        }
    });
}