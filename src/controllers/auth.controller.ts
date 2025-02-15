import { Request, Response } from "express";
import { io } from "../server";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthService } from "../services/auth.service";
import cache from "../utils/cache";
import { env } from "../config/env";

const activeSessions = new Map();

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        let user = cache.get(email);

        if (!user) {
            user = await AuthService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            cache.set(email, { id: user.id, email: user.email}, 3600);
        }

        cache.delete(email);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const existingSession = activeSessions.get(user.email);
        if (existingSession) {
            io.to(existingSession).emit("forceLogout");
        }

        const token = sign({ userId: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "1h" });

        activeSessions.set(user.email, req.session?.id || "");

        cache.set(user.email, { token, userId: user.id }, 3600);

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error });
    }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;

        if (activeSessions.has(email)) {
            activeSessions.delete(email);
        }

        cache.delete(email);

        return res.json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
