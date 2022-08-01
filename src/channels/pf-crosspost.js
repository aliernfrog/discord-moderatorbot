const { AttachmentBuilder, MessageFlags } = require("discord.js");

module.exports = {
  id: "1003647447135965216",
  async execute(client, message) {
    if (!message.flags.has(MessageFlags.IsCrosspost)) return;
    
    client.channels.cache.get("855250425794920448").send({
      allowedMentions: { parse: [] },
      content: message.content,
      embeds: message.embeds,
      files: message.attachments?.map(a => AttachmentBuilder.from(a))
    }).then(msg => msg.crosspost());
  }
}