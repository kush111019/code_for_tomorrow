"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "Takkupulto22@",
    database: process.env.DATABASE_NAME || "mydb",
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: ["src/migrations/*.ts"],
    subscribers: []
});
exports.AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error", err));
