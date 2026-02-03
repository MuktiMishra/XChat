import {Server} from "socket.io"; 

let io: Server | null; 

export const setIO = (serverIO: Server) => {
    io = serverIO; 
};

export const getIO = () => {
    if (!io) {
        throw new Error("no server instance found"); 
    }

    return io; 
}
