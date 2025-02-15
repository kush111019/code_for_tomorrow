import { DataSource } from "typeorm";
import { User } from "../models/User"; 
import { AppDataSource } from "../config/database"; 
import bcrypt from "bcryptjs";



async function seedDatabase() {
    try {
        await AppDataSource.initialize(); 
        console.log("Database connected successfully!");

        const hashedPassword = await bcrypt.hash("SecurePassword123", 10);

        const users = [
            {
                name: "John Doe",
                email: "john@example.com",
                password: hashedPassword,
            },
            {
                name: "Jane Doe",
                email: "jane@example.com",
                password: hashedPassword,
            },
        ];

        await AppDataSource.getRepository(User).save(users);

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
