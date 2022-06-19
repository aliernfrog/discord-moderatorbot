const { Client, Collection } = require("discord.js");
const server = require("./src/server.js");
const functions = require("./src/functions.js");
const db = require("./src/db/db.js");

const client = new Client({intents: ["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]});
client.commands = new Collection();
client.contextMenus = new Collection();
client.specialChannels = new Collection();

client.f = functions;
client.db = db;

client.f.readEvents(client);
client.f.readCommands(client);
client.f.readContextMenus(client);
client.f.readSpecialChannels(client);

server.start(client);
client.db.connect();
client.login(process.env.DISCORD_TOKEN);