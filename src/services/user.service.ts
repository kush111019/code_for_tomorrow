import { AppDataSource } from "../config/database";
import { User } from "../models/User";

export class UserService {
    static async getAllUsers() {
        return await AppDataSource.getRepository(User).find();
    }
}
