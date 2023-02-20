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
    ],
    dmPermission: false,
    defaultMemberPermissions: [PermissionFlagsBits.ManageMessages]
  },
  async execute(client, interaction) {
    await interaction.deferReply({ephemeral: true});

    const postPublicly = interaction.options.getBoolean("post-publicly") || false;
    const embed = await client.f.generateLeaderboard(client, interaction.guild.id);
    
    if (postPublicly) {
      await interaction.channel.send({embeds: [embed]});
      interaction.editReply({content: "Success! Run `/remove-map clear` to prepare for the next leaderboard", ephemeral: true});
    } else { 
      interaction.editReply({embeds: [embed], ephemeral: true});
    }
  }
}