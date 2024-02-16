export default {
  name: "add",
  async execute(client, interaction) {
    await interaction.deferReply();
    
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const regex = interaction.options.getString("auto-response-regex");
    const data = await client.db.guildData(interaction.guild.id);
    const faqData = { ...data.faq }
    
    const question = {
      title, description, regex
    }
    
    const faqChannel = await interaction.guild.channels.fetch(faqData.channelId);
    const thread = await faqChannel.threads.create({
      name: title.substring(0,99)
    });
    const message = await thread.send(client.f.generateQuestionMessage(question));
    
    question.channelId = thread.id;
    question.messageId = thread.id;
    
    faqData.faq ??= [];
    faqData.faq.push(question);
    data.faq = faqData;
    await data.save();
    
    await client.f.updateFAQMessage(interaction.guild);
    
    interaction.editReply({
      content: `✅ Added question: \`${question.title}\``
    });
  }
}