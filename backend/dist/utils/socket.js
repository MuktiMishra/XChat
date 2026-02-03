let io;
export const setIO = (serverIO) => {
    io = serverIO;
};
export const getIO = () => {
    if (!io) {
        throw new Error("no server instance found");
    }
    return io;
};
