const fs = require("fs");
const config = require("./config.json");

module.exports = {
  readEvents(client) {
    const files = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const event = require(`./events/${file}`);
      const fileName = file.replace(".js","");
      if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
      else client.on(event.name, (...args) => event.execute(client, ...args));
      console.log(`Loaded event: ${fileName}/${event.name}`);
    });
  },

  readContextMenus(client) {
    const files = fs.readdirSync("./src/interactions/contextMenus").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const contextMenu = require(`./interactions/contextMenus/${file}`);
      client.contextMenus.set(contextMenu.name, contextMenu);
    });
    console.log(`Loaded ${client.contextMenus.size} context menus`);
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

  async inform(message, options, deleteAfter, instantDelete) {
    if (options.content) options.content = `${message.author}, ${options.content || ""}`;
    else options = `${message.author}, ${options || ""}`;
    const reply = await message.channel.send(options);
    if (instantDelete) message.delete();
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