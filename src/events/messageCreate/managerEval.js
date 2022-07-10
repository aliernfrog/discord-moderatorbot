const Discord = require("discord.js");
const fetch = require("node-fetch")
const config = require("../../config.json");
const managers = process.env.MANAGERS.split("_");

module.exports = {
  execute(client, message) {
    if (!message.content.startsWith(config.evalPrefix)) return;
    if (!managers.includes(message.author.id)) return;

    const code = message.content.replace(config.evalPrefix, "");
    try {
      eval(code);
    } catch (e) {
      console.log(e);
    }
  }
}