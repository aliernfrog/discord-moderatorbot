import mongoose from "mongoose";
mongoose.set("strictQuery", true);

import Guild from "./schemas/Guild.js";
import User from "./schemas/User.js";

export async function connect() {
  await mongoose.connect(process.env.DB_URI).catch(() => {
    process.kill(1);
  });
  console.log("Database connected");
}

export async function guildData(id) {
  return await Guild.findOne({_id: id}) ?? new Guild({
    _id: id,
    maps: []
  });
}

export async function addMap(mapName, message) {
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

export async function userData(id) {
  return await User.findOne({_id: id}) ?? new User({
    _id: id,
    cooldowns: []
  });
}

export async function getUserCooldown(id, channel) {
  const data = await userData(id);
  return data.cooldowns.find(c => c.channel === channel) || {channel: channel};
}

export async function setUserCooldown(id, options) {
  const data = await userData(id);
  const cooldowns = data.cooldowns || [];
  const index = findCooldownIndex(cooldowns, options.channel);
  if (index === cooldowns.length) cooldowns.push(options);
  else cooldowns[index] = options;
  data.cooldowns = cooldowns;
  data.save();
}

export function findCooldownIndex(array, channel) {
  let index = array.length;
  for (let i = 0; i < array.length; i++) {
    if (array[i].channel === channel) {
      index = i;
      break;
    }
  }
  return index || 0;
}