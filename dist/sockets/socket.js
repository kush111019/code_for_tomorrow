"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const activeUsers = new Map();
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: { origin: "*" },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("user-login", (userId) => {
            var _a;
            if (activeUsers.has(userId)) {
                const previousSocketId = activeUsers.get(userId);
                io.to(previousSocketId).emit("force-logout");
                (_a = io.sockets.sockets.get(previousSocketId)) === null || _a === void 0 ? void 0 : _a.disconnect();
            }
            activeUsers.set(userId, socket.id);
            console.log(`User ${userId} logged in with socket ${socket.id}`);
        });
        socket.on("user-logout", (userId) => {
            activeUsers.delete(userId);
            console.log(`User ${userId} logged out`);
        });
        socket.on("update-resource", (data) => {
            io.emit("resource-updated", data);
            console.log("Resource updated:", data);
        });
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            activeUsers.forEach((value, key) => {
                if (value === socket.id)
                    activeUsers.delete(key);
            });
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
