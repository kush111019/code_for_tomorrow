"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.AppDataSource.initialize();
            console.log("Database connected successfully!");
            const hashedPassword = yield bcryptjs_1.default.hash("SecurePassword123", 10);
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
            yield database_1.AppDataSource.getRepository(User_1.User).save(users);
            console.log("Database seeded successfully!");
            process.exit(0);
        }
        catch (error) {
            console.error("Error seeding database:", error);
            process.exit(1);
        }
    });
}
seedDatabase();
