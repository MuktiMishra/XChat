import {Server, Socket} from "socket.io"; 

export const registerSocketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("user connected"); 

        socket.on("create-room", () => {
            socket.join("123"); 
            console.log("user joined room"); 
            socket.broadcast.emit("a socket was created");
        }); 

        socket.on("disconnect", () => {
            console.log("socket disconnected"); 
        });
    });
}
