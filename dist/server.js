"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cache_routes_1 = __importDefault(require("./routes/cache.routes"));
const socket_1 = require("./sockets/socket");
const socket_io_1 = require("socket.io");
const resource_routes_1 = __importDefault(require("./routes/resource.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
exports.io = io;
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/cache", cache_routes_1.default);
app.use("/api/resource", resource_routes_1.default);
(0, socket_1.initializeSocket)(server);
const PORT = process.env.PORT || 5000;
database_1.AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("Database connections error: ", error);
});
