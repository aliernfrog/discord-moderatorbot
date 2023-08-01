const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "user-stats",
  async execute(client, interaction) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    const data = await client.db.guildData(interaction.guild.id);
    const userData = data.counting.users.get(user.id) ?? {};
    const counts = userData.counts ?? 0;
    
    //TODO show milestones the user has reached
    //TODO improve this
    const embed = new EmbedBuilder()
      .setTitle(user.displayName)
      .setThumbnail(user.avatarURL())
      .setColor("Random")
      .setDescription(`Participated in counting **${counts}** times`);

    interaction.reply({
      embeds: [embed]
    });
  }
}