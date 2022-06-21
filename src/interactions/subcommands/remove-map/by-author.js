module.exports = {
  name: "by-author",
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, interaction) {
    const id = interaction.options.getString("id");
    const data = await client.db.guildData(interaction.guild.id);
    const maps = data.maps.filter(map => map.authorId !== id);
    data.maps = maps;
    await data.save();
    interaction.reply({content: "Success!", ephemeral: true});
  }
}