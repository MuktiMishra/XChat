import {Router} from "express"; 
import {getIO} from "../utils/socket.js"; 
import {redisClient} from "../utils/redis.js"

const roomRouter = Router();

roomRouter.post('/create', async (req, res) => {
    const { roomName, activeTime } = req.body; 

    if (!roomName || !activeTime ) {
        return res.status(400).json({message: "Bad Request", data: {}}); 
    }
    
    await redisClient.set(roomName, JSON.stringify([])); 
    await redisClient.expire(roomName, number(activeTime.slice(0, 3)*60)); // 30m means 30 minutes so 30 * 60 = 1800 seconds or 30 minutes

    return res.status(200).json({message: "Successfully initialized", data: {roomName}}); 
});

roomRouter.post('/delete', async(req, res) => {
    const {roomName} = req.body; 
    console.log(roomName); 

    await redisClient.del(roomName); 

    return res.status(200).json({message: "successfully deleted", data: {}}); 
}); 

export default roomRouter; 
