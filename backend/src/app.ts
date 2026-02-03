import express from "express";
import cors from 'cors'; 
import RoomRouter from "./routes/rooms.js"; 

const app = express(); 

app.get('/', (req: express.Request, res: express.Response) => {
    return res.json({text: "hi"}); 
});

app.use(express.json()); 
app.use(cors()); 
app.use("/rooms", RoomRouter); 
export default app;
