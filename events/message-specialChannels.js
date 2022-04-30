const config = require("../config.json");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;
    const channel = client.specialChannels.get(message.channel.id);
    if (!channel) return;
    if (!client.f.checkPerms(client.user, message.channel, "MANAGE_MESSAGES")) return;

    message.inform = (options, deleteAfter) => client.f.inform(message, options, deleteAfter);
    message.author.moderator = client.f.checkPerms(message.author, message.channel, "MANAGE_MESSAGES");

    if (channel.mediaOnly && !message.author.moderator && !client.f.hasMedia(message)) return message.inform("This channel is media-only");
    
    if (channel.cooldown && channel.cooldown.duration) {
      const data = await client.db.getUserCooldown(message.author.id, message.channel.id);
      const lastMsg = data.lastMsg || 0;
      const nextMsg = parseInt(lastMsg)+parseInt(channel.cooldown.duration);
      if (Date.now() < nextMsg) {
        const timestamp = `<t:${Math.floor(nextMsg/1000)}:F>`;
        const msg = (channel.cooldown.message || config.defaultCooldownMessage).replace("%TIME%", timestamp);    
        message.inform(msg);
      } else {
        await client.db.setUserCooldown(message.author.id, {
          channel: message.channel.id,
          lastMsg: Date.now()
        });
      }
    }
    
    if (channel.autoThread && !message.hasThread) message.startThread(channel.autoThread);
    if (channel.execute) channel.execute(client, message);
  }
}