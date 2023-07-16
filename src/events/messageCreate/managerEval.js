const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../values/config.js");

module.exports = {
  execute(client, message) {
    const prefix = config.evalPrefix.replace("{ID}", client.user.id);
    if (!message.content.startsWith(prefix)) return;
    if (!config.managers.includes(message.author.id)) return;

    const code = message.content.replace(prefix, "");
    try {
      eval(code);
    } catch (e) {
      console.log(e);
    }
  }
}