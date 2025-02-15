import  { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { AppDataSource  } from "../config/database";

export class AuthService {
    static async login(email: string, password: string) {

        
        const userRepository = AppDataSource.getRepository(User);
        const user: User|null = await userRepository.findOneBy({email});
        if(!user){
            throw new Error("Invalid credentials")
        }
        if(!user || !(await bcrypt.compare(password,user.password))){
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({id: user.id}, env.JWT_SECRET, {expiresIn: "1h"});
        return { token };
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOneBy({ email });
    }
}

