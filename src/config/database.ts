import { DataSource} from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User";


dotenv.config();


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "Takkupulto22@",
    database: process.env.DATABASE_NAME || "mydb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["src/migrations/*.ts"],
    subscribers: []
});


AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error", err));