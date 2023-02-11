const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../values/config.js");

module.exports = {
  execute(client, message) {
    if (!message.content.startsWith(config.evalPrefix)) return;
    if (!config.managers.includes(message.author.id)) return;

    const code = message.content.replace(config.evalPrefix, "");
    try {
      eval(code);
    } catch (e) {
      console.log(e);
    }
  }
}