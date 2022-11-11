const { AttachmentBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: {
    name: "view-maps",
    description: "Sends maps array as an ephemeral message"
  },
  guildOnly: true,
  permissions: [PermissionFlagsBits.ManageMessages],
  async execute(client, interaction) {
    const data = await client.db.guildData(interaction.guild.id);
    const maps = data.maps || [];
    const string = JSON.stringify(maps, null, 1);
    if (string.length <= 4084) {
      const embed = new EmbedBuilder().setDescription("```js\n"+string+"\n```");
      interaction.reply({embeds: [embed], ephemeral: true});
    } else {
      const buffer = Buffer.from(string, "utf-8");
      const file = new AttachmentBuilder(buffer).setName("maps.json");
      interaction.reply({files: [file], ephemeral: true});
    }
  }
}