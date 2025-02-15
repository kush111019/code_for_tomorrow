import 'reflect-metadata';
import path from "path";
import { DataSource } from 'typeorm';
import { env } from "./src/config/env";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Takkupulto22@",
    database: "mydb",
    synchronize: false,
    logging: true,
    entities:[path.join(__dirname,"src/models/**/*.ts")],
    migrations:[path.join(__dirname,"src/migrations/**/*.ts")],
    subscribers:[path.join(__dirname,"src/subscribers/**/*.ts")],
});


