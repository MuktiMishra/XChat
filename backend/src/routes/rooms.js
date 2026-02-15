import { Router } from "express";
import { redisClient } from "../utils/redis.js";

const roomRouter = Router();

const parseActiveTimeToSeconds = (activeTime) => {
  const minutes = Number(String(activeTime).replace(/[^\d]/g, ""));
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return null;
  }

  return minutes * 60;
};

roomRouter.post("/create", async (req, res) => {
  const { roomName, activeTime } = req.body;

  if (!roomName || !activeTime) {
    return res.status(400).json({ message: "Bad Request", data: {} });
  }

  const ttl = parseActiveTimeToSeconds(activeTime);
  if (!ttl) {
    return res.status(400).json({ message: "Invalid activeTime", data: {} });
  }

  await redisClient.set(roomName, JSON.stringify([]));
  await redisClient.expire(roomName, ttl);

  return res
    .status(200)
    .json({ message: "Successfully initialized", data: { roomName, ttl } });
});

roomRouter.get("/:roomName", async (req, res) => {
  const { roomName } = req.params;
  const messages = await redisClient.get(roomName);

  if (messages === null) {
    return res.status(404).json({ message: "Room not found", data: {} });
  }

  return res.status(200).json({
    message: "Room found",
    data: { roomName, messages: JSON.parse(messages) },
  });
});

roomRouter.post("/delete", async (req, res) => {
  const { roomName } = req.body;

  await redisClient.del(roomName);

  return res.status(200).json({ message: "successfully deleted", data: {} });
});

export default roomRouter;
