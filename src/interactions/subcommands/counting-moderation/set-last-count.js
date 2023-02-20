module.exports = {
  name: "set-last-count",
  async execute(client, interaction) {
    const lastCount = interaction.options.getInteger("last-count");
    const resetLastUser = interaction.options.getBoolean("reset-last-user") ?? true;
    const data = await client.db.guildData(interaction.guild.id);

    data.counting.lastCount = lastCount;
    if (resetLastUser) data.counting.lastUserId = null;
    await data.save();

    interaction.reply({
      content: `☑️ Set last count to **${lastCount}**${resetLastUser ? ", and reset last user" : ""}`
    });
  }
}