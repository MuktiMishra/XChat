import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    owner: {
        type: String
    }
}, { timestamps: true });
const roomModel = mongoose.model("room", roomSchema);
export default roomModel;
