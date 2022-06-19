const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "view-maps",
    description: "View maps array"
  },
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, interaction) {
    const data = await client.db.guildData(interaction.guild.id);
    const maps = data.maps || [];
    const string = JSON.stringify(maps, null, 1);
    if (string.length <= 4084) {
      const embed = new MessageEmbed().setDescription("```js\n"+string+"\n```");
      interaction.reply({embeds: [embed], ephemeral: true});
    } else {
      const buffer = Buffer.from(string, "utf-8");
      const file = new MessageAttachment(buffer, "maps.json");
      interaction.reply({files: [file], ephemeral: true});
    }
  }
}