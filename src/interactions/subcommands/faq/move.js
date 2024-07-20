export default {
  name: "move",
  async execute(client, interaction) {
    await interaction.deferReply();
    
    const index = interaction.options.getInteger("index")-1;
    const toIndex = interaction.options.getInteger("to-index")-1;
    
    const data = await client.db.guildData(interaction.guild.id);
    const faqData = { ...data.faq }
    const faqs = faqData.faq;
    const question = faqs[index];
    faqs[index] = faqs[toIndex];
    faqs[toIndex] = question;
    faqData.faq = faqs;
    data.faq = faqData;
    await data.save();
    await client.f.updateFAQMessage(interaction.guild);
    
    interaction.editReply({
      content: `Swapped questions`
    });
  }
}