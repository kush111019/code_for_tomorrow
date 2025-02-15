import "reflect-metadata";
import express from "express";
import session from "express-session";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./config/database";
import authRoutes from  "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cacheRoutes from "./routes/cache.routes";
import { initializeSocket } from "./sockets/socket";
import { Server } from "socket.io";
import resourceRoutes from "./routes/resource.routes";
import dotenv from "dotenv";


dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({ origin: "*", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "your-secret-key", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/cache", cacheRoutes);
app.use("/api/resource", resourceRoutes);

export { io };

initializeSocket(server);


const PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("Database connections error: ",error);
})
