const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "clear",
  guildOnly: true,
  permissions: [PermissionFlagsBits.ManageMessages],
  async execute(client, interaction) {
    const confirm = interaction.options.getBoolean("confirm");

    if (confirm) {
      const data = await client.db.guildData(interaction.guild.id);
      data.maps = [];
      await data.save();
      interaction.reply({content: "Success!", ephemeral: true});
    } else {
      interaction.reply({content: "You didn't confirm the action", ephemeral: true});
    }
  }
}