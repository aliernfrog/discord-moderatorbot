const Discord = require("discord.js");
const server = require("./server.js");
const functions = require("./functions.js");
const db = require("./db/db.js");

const client = new Discord.Client({intents: ["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]});
client.f = functions;
client.db = db;

client.f.readEvents(client);
client.f.readSpecialChannels(client);

server.start(client);
client.db.connect();
client.login(process.env.BOT_TOKEN);