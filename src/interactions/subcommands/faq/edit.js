export default {
  name: "edit",
  async execute(client, interaction) {
    await interaction.deferReply();
    
    const index = interaction.options.getInteger("index")-1;
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const regex = interaction.options.getString("auto-response-regex");
    
    const data = await client.db.guildData(interaction.guild.id);
    const faqData = { ...data.faq }
    
    const question = faqData.faq[index];
    if (title) question.title = title;
    if (description) question.description = description;
    if (regex) question.regex = regex;
    faqData.faq[index] = question;
    data.faq = faqData;
    
    const thread = await interaction.guild.channels.fetch(question.channelId);
    const message = await thread.messages.fetch(question.messageId);
    await message.edit(client.f.generateQuestionMessage(question));
    await data.save();
    await client.f.updateFAQMessage(interaction.guild);
    if (title) await thread.edit({ name: title });
    
    interaction.editReply({
      content: `Edited question: \`${question.title}\``
    });
  }
}