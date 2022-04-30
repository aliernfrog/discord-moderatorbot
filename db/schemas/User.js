const mongoose = require("mongoose");
const name = "modbot_users";

module.exports = mongoose.model(name, new mongoose.Schema({
  _id: String,
  cooldowns: Array
}));