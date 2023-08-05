const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const config = require("../values/config.js");

module.exports = {
  readEvents(client) {
    const files = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const event = require(`../events/${file}`);
      if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
      else client.on(event.name, (...args) => event.execute(client, ...args));
    });
    console.log(`Loaded ${files.length} events`);
  },

  readCommands(client) {
    const folders = fs.readdirSync("./src/interactions/commands");
    folders.forEach(folder => {
      const files = fs.readdirSync(`./src/interactions/commands/${folder}`).filter(file => file.endsWith(".js"));
      files.forEach(file => {
        const command = require(`../interactions/commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
      });
    });
    console.log(`Loaded ${client.commands.size} commands`);
  },

  readSubcommands(client) {
    const folders = fs.readdirSync("./src/interactions/subcommands");
    folders.forEach(folder => {
      const files = fs.readdirSync(`./src/interactions/subcommands/${folder}`).filter(file => file.endsWith(".js"));
      files.forEach(file => {
        const subcommand = require(`../interactions/subcommands/${folder}/${file}`);
        client.subcommands.set(`${folder}/${subcommand.name}`, subcommand);
      });
    });
    console.log(`Loaded ${client.subcommands.size} subcommands`);
  },

  readMessageComponents(client) {
    const folders = fs.readdirSync("./src/interactions/messageComponents");
    folders.forEach(folder => {
      const files = fs.readdirSync(`./src/interactions/messageComponents/${folder}`).filter(file => file.endsWith(".js"));
      files.forEach(file => {
        const component = require(`../interactions/messageComponents/${folder}/${file}`);
        client.messageComponents.set(component.name, component);
      });
    });
    console.log(`Loaded ${client.messageComponents.size} message components`);
  },

  readSpecialChannels(client) {
    const files = fs.readdirSync("./src/channels").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const channel = require(`../channels/${file}`);
      client.specialChannels.set(channel.id, channel);
    });
    console.log(`Loaded ${client.specialChannels.size} special channels`);
  },

  readSpecialForums(client) {
    const files = fs.readdirSync("./src/forums").filter(file => file.endsWith(".js"));
    const toInit = [];
    files.forEach(file => {
      const forum = require(`../forums/${file}`);
      if (forum.init) toInit.push(forum.init);
      client.specialForums.set(forum.id, forum);
    });
    if (toInit.length) client.once("ready", async (cl) => {
      for (const execute of toInit) {
        try {
          await execute(cl);
        } catch (e) {
          console.error(e);
        }
      }
    });
    console.log(`Loaded ${client.specialForums.size} special forums`);
  },

  readNavigatorChannels(client) {
    const files = fs.readdirSync("./src/navigatorChannels").filter(file => file.endsWith(".js"));
    files.forEach(file => {
      const channel = require(`../navigatorChannels/${file}`);
      client.navigatorChannels.set(channel.id, channel);
    });
    console.log(`Loaded ${client.navigatorChannels.size} navigator channels`);
  },

  async inform(message, options, deleteAfter, instantDelete) {
    if (message.system) return message.delete();
    if (options.content) options.content = `${message.author}, ${options.content || ""}`;
    else options = `${message.author}, ${options || ""}`;
    const reply = await message.channel.send(options);
    if (instantDelete) message.delete();
    setTimeout(() => {
      if (!instantDelete) message.delete();
      reply.delete();
    }, deleteAfter || config.defaultInformTimeout);
  },

  async isInGuild(user, guild) {
    try {
      const member = await guild.members.fetch(user.id);
      if (member) return true;
      else return false;
    } catch (e) {
      return false;
    }
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
  },

  buildMessageURL(message) {
    return `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
  },

  buildChannelURL(channel) {
    return `https://discord.com/channels/${channel.guild.id}/${channel.id}`;
  },

  async generateLeaderboard(client, guildId) {
    const data = await client.db.guildData(guildId);
    const maps = data.maps || [];
    const starred = [];
    const leaders = [];
    for (let i = 0; i < maps.length; i++) {
      try {
        const map = maps[i];
        const channel = await client.channels.fetch(map.channelId);
        const message = await channel.messages.fetch(map.messageId, {force: true});
        const upvotes = message.reactions.resolve("968963540117512252")?.count || 0;
        const downvotes = message.reactions.resolve("968963600611934259")?.count || 0;
        const stars = message.reactions.resolve("⭐")?.count || 0;
        map.totalVotes = upvotes-downvotes;
        map.link = `https://discord.com/channels/${guildId}/${map.channelId}/${map.messageId}`;
        if (stars > 0) starred.push(map);
        else if (map.totalVotes > 0) leaders.push(map);
      } catch (_) { /**/ }
    }
    const embed = new EmbedBuilder().setTitle("🏆 Map leaderboard").setColor("Random");
    const fields = [];
    starred.sort((a,b) => b.totalVotes-a.totalVotes);
    leaders.sort((a,b) => b.totalVotes-a.totalVotes);
    starred.forEach(map => fields.push({name: `⭐ \`${map.mapName.replaceAll("`","")}\` - ${map.totalVotes} votes - by <@${map.authorId}>`, value: `[View map](${map.link})`}));
    leaders.slice(0,10).forEach(map => fields.push({name: `• \`${map.mapName.replaceAll("`","")}\` - ${map.totalVotes} votes - by <@${map.authorId}>`, value: `[View map](${map.link})`}));
    embed.addFields(fields);
    return embed;
  }
}