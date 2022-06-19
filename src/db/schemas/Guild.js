const mongoose = require("mongoose");
const name = "modbot_guilds";

module.exports = mongoose.model(name, new mongoose.Schema({
  _id: String,
  maps: Array
}));