module.exports = {
  name: "set-user-data",
  async execute(client, interaction) {
    const user = interaction.options.getUser("user");
    const counts = interaction.options.getInteger("counts");
    const data = await client.db.guildData(interaction.guild.id);

    const userData = data.counting.users.get(user.id) ?? {};
    if (counts) userData.counts = counts;
    data.counting.users.set(user.id, userData);

    await data.save();

    interaction.reply({
      content: "☑️ Set user data"
    });
  }
}