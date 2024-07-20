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
    const titleChanged = title && question.title !== title;
    if (title) question.title = title;
    if (description) question.description = description;
    if (regex) question.regex = regex;
    
    const msg = client.f.generateQuestionMessage(question);
    let thread = await interaction.guild.channels.fetch(question.channelId);
    if (titleChanged) {
      await thread.delete("question title change");
      thread = await thread.parent.threads.create({
        name: title.substring(0, 99)
      });
      const message = await thread.send(msg);
      question.channelId = thread.id;
      question.messageId = message.id;
    } else {
      const message = await thread.messages.fetch(question.messageId);
      await message.edit(msg);
    }
    
    faqData.faq[index] = question;
    data.faq = faqData;
    await data.save();
    await client.f.updateFAQMessage(interaction.guild);
    
    interaction.editReply({
      content: `Edited question: \`${question.title}\``
    });
  }
}