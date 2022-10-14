const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: {
    name: "map-leaderboard",
    description: "Sends map leaderboard in current channel",
    options: [
      {
        name: "post-publicly",
        description: "Post the message publicly, false by default",
        type: ApplicationCommandOptionType.Boolean
      }
    ]
  },
  guildOnly: true,
  permissions: [PermissionFlagsBits.ManageMessages],
  async execute(client, interaction) {
    const postPublicly = interaction.options.getBoolean("post-publicly") || false;
    await interaction.defer({ephemeral: postPublicly});
    
    const embed = await client.f.generateLeaderboard(client, interaction.guild.id);
    
    if (postPublicly) {
      await interaction.channel.send({embeds: [embed]});
      interaction.reply({content: "Success! Run `/remove-map clear` to prepare for the next leaderboard", ephemeral: true});
    } else { 
      interaction.reply({embeds: [embed], ephemeral: true});
    }
  }
}