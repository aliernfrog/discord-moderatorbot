module.exports = {
  name: "by-name",
  guildOnly: true,
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, interaction) {
    const name = interaction.options.getString("name");
    const data = await client.db.guildData(interaction.guild.id);
    const maps = data.maps.filter(map => map.mapName !== name);
    data.maps = maps;
    await data.save();
    interaction.reply({content: "Success!", ephemeral: true});
  }
}