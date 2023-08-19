const { MessageType } = require("discord.js");

module.exports = (client, message) => {
  const channel = client.navigatorChannels.get(message.channel.id);
  if (!channel) return;

  if (message.type === MessageType.ThreadCreated) message.delete();
}