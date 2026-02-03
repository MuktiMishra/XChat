import mongoose from "mongoose";
const connect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log("Database connected!");
    }
    catch (e) {
        console.log("Database failed to connect because of", e);
    }
};
export default connect;
