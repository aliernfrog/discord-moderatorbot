const mongoose = require("mongoose");

const User = require("./schemas/User.js");

function connect(client) {
  mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log("Database connected");
}

async function userData(id) {
  let user = await User.findOne({_id: id});
  if (!user) {
    user = new User({
      _id: id,
      cooldowns: []
    });
  }
  return user;
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
module.exports.userData = userData;
module.exports.getUserCooldown = getUserCooldown;
module.exports.setUserCooldown = setUserCooldown;