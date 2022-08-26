const { Client, Collection, GatewayIntentBits } = require("discord.js");
const server = require("./src/server.js");
const config = require("./src/config.js");
const functions = require("./src/functions.js");
const db = require("./src/db/db.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.rest.on("rateLimited", (data) => {
  console.log("Rate limited");
  process.kill(1);
});

client.commands = new Collection();
client.subcommands = new Collection();
client.specialChannels = new Collection();
client.f = functions;
client.db = db;

client.f.readEvents(client);
client.f.readCommands(client);
client.f.readSubcommands(client);
client.f.readSpecialChannels(client);

server.start(client);
client.db.connect();
client.login(config.token);