import { redisClient } from "./redis.js";

const rooms = new Map();

export const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("join-room", (data) => {
      socket.join(data.roomId);

      if (!rooms.has(data.roomId)) {
        rooms.set(data.roomId, new Map());
      }

      rooms.get(data.roomId).set(socket.id, data.userId);

      const activeUsers = Array.from(rooms.get(data.roomId).values());

      io.to(data.roomId).emit("active-users", activeUsers);
    });

    socket.on("send-message", async (data) => {
      const existingMessages = await redisClient.get(data.roomId);
      const messages = existingMessages ? JSON.parse(existingMessages) : [];

      messages.push(data.messageData);
      await redisClient.set(data.roomId, JSON.stringify(messages));

      io.to(data.roomId).emit("receive-message", data.messageData);
    });

    socket.on("disconnect", () => {
      rooms.forEach((users, roomId) => {
        if (users.has(socket.id)) {
          users.delete(socket.id);

          if (users.size === 0) {
            rooms.delete(roomId);
          }

          const activeUsers = Array.from(users.values());

          io.to(roomId).emit("active-users", activeUsers);
        }
      });
      console.log("socket disconnected");
    });
  });
};
