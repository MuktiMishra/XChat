import {Router, Request, Response} from "express"; 
import {getIO} from "../utils/socket.js"; 

const roomRouter = Router();

roomRouter.post('/create', async (req: Request, res: Response) => {
    const io = getIO();     
    io.emit("create-room"); 
    res.json({ message: "joined room"}); 

});

export default roomRouter; 
