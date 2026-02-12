import {Server} from "socket.io"; 
import {redisClient} from "./redis.js";

const rooms = new Map(); 

export const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("user connected"); 

       socket.on("join-room", (data) => {
           console.log("join ran", data); 
           socket.join(data.roomId); 

            if (!rooms.has(data.roomId)) {
                rooms.set(data.roomId, new Map());     
            }

           rooms.get(data.roomId).set(socket.id, data.userId); 

           const activeUsers = Array.from(rooms.get(data.roomId).values()); 

           socket.to(data.roomId).emit("active-users", activeUsers); 
       }); 

        socket.on("send-message", async (data) => {
            console.log("got it", data); 
            let messages = JSON.parse(await redisClient.get(data.roomId)); 
            console.log(messages);
            messages = messages.push(data.messageData); 
            socket.to(data.roomId).emit("recieve-message", data.messageData); 
        });
            
        socket.on("disconnect", () => {
            rooms.forEach((users, roomId) => {
                if (users.has(socket.id)){
                    users.delete(socket.id); 

                    const activeUsers = Array.from(users.values());

                    io.to(roomId).emit("active-users", activeUsers);
                }
            }); 
            console.log("socket disconnected"); 
        });
    });
}
