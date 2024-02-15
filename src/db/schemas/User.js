import mongoose from "mongoose";
const name = "modbot_users";

export default mongoose.model(name, new mongoose.Schema({
  _id: String,
  cooldowns: Array
}));