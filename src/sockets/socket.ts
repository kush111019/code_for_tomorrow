import { Server } from "socket.io";

const activeUsers = new Map<string, string>(); 

export const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: { origin: "*" }, 
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        
        socket.on("user-login", (userId: string) => {
           
            if (activeUsers.has(userId)) {
                const previousSocketId = activeUsers.get(userId);
                io.to(previousSocketId!).emit("force-logout");
                io.sockets.sockets.get(previousSocketId!)?.disconnect();
            }
            
            activeUsers.set(userId, socket.id);
            console.log(`User ${userId} logged in with socket ${socket.id}`);
        });

        
        socket.on("user-logout", (userId: string) => {
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
                if (value === socket.id) activeUsers.delete(key);
            });
        });
    });

    return io;
};
