export default {
  name: "set-message",
  async execute(client, interaction) {
    await interaction.deferReply();
    
    let messageId = interaction.options.getString("message-id");
    const channel = interaction.options.getChannel("channel") ?? interaction.channel;
    const data = await client.db.guildData(interaction.guild.id);
    const faqData = { ...data.faq }
    
    if (messageId == "CREATE") {
      const message = await channel.send({
        content: client.f.generateFAQMessage(faqData.faq, interaction.guild)
      });
      messageId = message.id;
    }
    
    faqData.channelId = channel.id;
    faqData.messageId = messageId;
    data.faq = faqData;
    await data.save();
    
    interaction.editReply({
      content: `✅ Set FAQ message to https://discord.com/channels/${interaction.guild.id}/${channel.id}/${messageId}`
    });
  }
}