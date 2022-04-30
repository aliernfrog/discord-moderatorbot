const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

module.exports = {
  readEvents(client) {
    const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const event = require(`./events/${file}`);
      const fileName = file.replace(".js","");
      client.on(event.name, (...args) => event.execute(client, ...args));
      console.log(`Loaded event: ${fileName}/${event.name}`);
    });
  },

  readSpecialChannels(client) {
    client.specialChannels = new Discord.Collection();
    const files = fs.readdirSync("./channels").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const channel = require(`./channels/${file}`);
      const fileName = file.replace(".js","");
      client.specialChannels.set(channel.id, channel);
      console.log(`Loaded special channel: ${fileName}`);
    });
  },

  checkPerms(user, channel, perms) {
    if (!perms) perms = ["SEND_MESSAGES","VIEW_CHANNEL"];
    perms = [].concat(perms);
    let ret = true;
    perms.forEach(perm => {
      if (!channel.permissionsFor(user).has(perm)) ret = false;
    });
    return ret;
  },

  inform(message, options, deleteAfter) {
    message.reply(options).then(reply => {
      setTimeout(() => {
        reply.delete();
        message.delete();
      }, deleteAfter || config.defaultInformTimeout);
    });
  },

  hasMedia(message) {
    if (!message.attachments.size) return false;
    return true;
  },

  hasLink(message) {
    return message.content.includes("http://") || message.content.includes("https://") || message.content.includes("discord.gg");
  },

  getFileName(str) {
    const split = str.split(".");
    split.pop();
    return split.join(".");
  }
}