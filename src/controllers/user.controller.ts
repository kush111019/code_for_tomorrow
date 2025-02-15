import { Request ,Response } from "express";
import { UserService } from "../services/user.service";


export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
}

