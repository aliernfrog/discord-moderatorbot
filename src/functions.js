const fs = require("fs");
const config = require("./config.json");

module.exports = {
  readEvents(client) {
    const files = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const event = require(`./events/${file}`);
      const fileName = file.replace(".js","");
      client.on(event.name, (...args) => event.execute(client, ...args));
      console.log(`Loaded event: ${fileName}/${event.name}`);
    });
  },

  readSpecialChannels(client) {
    const files = fs.readdirSync("./src/channels").filter(file => file.endsWith(".js"));
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

  async inform(message, options, deleteAfter, instantDelete) {
    let reply = {};
    if (instantDelete) {
      if (options.content) options.content = `${message.author}, ${options.content}`;
      else options = `${message.author}, ${options}`;
      reply = await message.channel.send(options);
    } else {
      reply = await message.reply(options);
    }
    if (instantDelete) await message.delete();
    setTimeout(() => {
      if (!instantDelete) message.delete();
      reply.delete();
    }, deleteAfter || config.defaultInformTimeout);
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