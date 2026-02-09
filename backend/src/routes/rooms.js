import {Router} from "express"; 
import {getIO} from "../utils/socket.js"; 
import {redisClient} from "../utils/redis.js"

const roomRouter = Router();

roomRouter.post('/create', async (req, res) => {
    const { roomName, activeTime } = req.body; 

    if (!roomName || !activeTime ) {
        return res.status(400).json({message: "Bad Request", data: {}}); 
    }
    
    redisClient.set("roomName", JSON.stringify({})); 

    return res.status(200).json({message: "Successfully initialized", data: {roomName}}); 

});

export default roomRouter; 
