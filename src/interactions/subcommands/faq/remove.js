export default {
  name: "remove",
  async execute(client, interaction) {
    await interaction.deferReply();
    
    const index = interaction.options.getInteger("index")-1;
    const data = await client.db.guildData(interaction.guild.id);
    const faqData = { ...data.faq }
    
    const question = faqData.faq[index];
    faqData.faq.splice(index, 1);
    data.faq = faqData;
    await data.save();
    await client.f.updateFAQMessage(interaction.guild);
    
    const thread = await interaction.guild.channels.fetch(question.channelId);
    await thread.delete();
    
    interaction.editReply({
      content: `✅ Removed question: \`${question.title}\``
    });
  }
}