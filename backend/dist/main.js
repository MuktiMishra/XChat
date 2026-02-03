import app from "./app.js";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();
export let io = null;
const start = async () => {
    const displayURL = `http://localhost:${process.env.PORT}`;
    await connect();
    const server = http.createServer(app);
    io = new Server(server, {
        cors: { origin: '*', methods: ['GET', 'POST'] }
    });
    server.listen(process.env.PORT, () => {
        console.log("Server has started:", displayURL);
    });
};
start().catch((error) => console.log("error while starting: ", error));
