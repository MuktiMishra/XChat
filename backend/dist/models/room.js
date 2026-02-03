import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({});
const roomModel = mongoose.model("room", roomSchema);
export default roomModel;
