require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const server = require("./src/utils/ServerUtil.js");
const config = require("./src/values/config.js");
const guildConfig = require("./src/values/guildConfig.js");
const functions = require("./src/utils/GeneralUtil.js");
const AIUtil = require("./src/utils/AIUtil.js");
const ModLogUtil = require("./src/utils/ModLogUtil.js");
const db = require("./src/db/db.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.rest.on("rateLimited", (data) => {
  if (data.timeout > 10000) process.kill(1);
});

client.commands = new Collection();
client.subcommands = new Collection();
client.messageComponents = new Collection();
client.specialChannels = new Collection();
client.specialForums = new Collection();
client.navigatorChannels = new Collection();

client.config = config;
client.guildConfig = guildConfig;
client.f = functions;
client.ModLogUtil = ModLogUtil;
client.AIUtil = AIUtil;
client.db = db;

client.f.readEvents(client);
client.f.readCommands(client);
client.f.readSubcommands(client);
client.f.readMessageComponents(client);
client.f.readSpecialChannels(client);
client.f.readSpecialForums(client);
client.f.readNavigatorChannels(client);

server.start(client);
client.db.connect();
client.login(config.token);