import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../config/database"; 

export const updateUser = async (req: Request, res: Response) :Promise<any> => {
    try {
        const { resourceId, newData } = req.body;

        if (!newData || !newData.email) {
            return res.status(400).json({ message: "Invalid request: new email is required" });
        }
        
        const userRepo = AppDataSource.getRepository(User); 
        const user = await userRepo.findOneBy({ id: resourceId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.email = newData.email; 
        await userRepo.save(user);
        return res.json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
