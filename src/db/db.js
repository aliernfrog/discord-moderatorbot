const mongoose = require("mongoose");
const config = require("../values/config.js");
mongoose.set("strictQuery", true);

const Guild = require("./schemas/Guild.js");
const User = require("./schemas/User.js");

async function connect(client) {
  return await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if (err) process.kill(1);
    else console.log("Database connected");
  });
}

async function guildData(id) {
  const guild = await Guild.findOne({_id: id});
  return guild ?? new Guild({_id: id, maps: []});
}

async function addMap(mapName, message) {
  const data = await guildData(message.guild.id);
  const maps = data.maps || [];
  if (maps.find(m => m.messageId === message.id)) return;
  const obj = {
    messageId: message.id,
    channelId: message.channel.id,
    authorId: message.author.id,
    mapName: mapName
  }
  maps.push(obj);
  data.maps = maps;
  data.save();
}

async function userData(id) {
  const user = await User.findOne({_id: id});
  return user ?? new User({_id: id, cooldowns: []});
}

async function getUserCooldown(id, channel, returnIndex) {
  const data = await userData(id);
  return data.cooldowns.find(c => c.channel === channel) || {channel: channel};
}

async function setUserCooldown(id, options) {
  const data = await userData(id);
  const cooldowns = data.cooldowns || [];
  const index = findCooldownIndex(cooldowns, options.channel);
  if (index === cooldowns.length) cooldowns.push(options);
  else cooldowns[i] = options;
  data.cooldowns = cooldowns;
  data.save();
}

function findCooldownIndex(array, channel) {
  let index = array.length;
  for (i = 0; i < array.length; i++) {
    if (array[i].channel === channel) {
      index = i;
      break;
    }
  }
  return index || 0;
}

module.exports.connect = connect;
module.exports.guildData = guildData;
module.exports.addMap = addMap;
module.exports.userData = userData;
module.exports.getUserCooldown = getUserCooldown;
module.exports.setUserCooldown = setUserCooldown;