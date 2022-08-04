const { MessageFlags } = require("discord.js");

module.exports = {
  id: "1003647447135965216",
  async execute(client, message) {
    if (!message.flags.has(MessageFlags.IsCrosspost)) return;
    
    client.channels.cache.get("855250425794920448").send({
      allowedMentions: { parse: [] },
      content: message.content+message.attachments?.map(a => `\n${a.url}`),
      embeds: message.embeds
    }).then(msg => msg.crosspost());
  }
}