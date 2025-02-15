import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("token is : ",token)
        console.log("env.JWT_SECRET IS : ",env.JWT_SECRET)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });

        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); 
        return res.status(401).json({ message: "Invalid token" });
    }
};
