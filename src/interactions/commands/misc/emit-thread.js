const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: {
    name: "emit-thread",
    description: "Emits create event for current thread.",
    dmPermission: false,
    defaultMemberPermissions: [PermissionFlagsBits.ManageThreads]
  },
  execute(client, interaction) {
    if (!interaction.channel.isThread()) return interaction.reply({
      content: "Command must be used in a thread.",
      ephemeral: true
    });
    
    client.emit("threadCreate", interaction.channel);

    interaction.reply({
      content: "Success!",
      ephemeral: true
    });
  }
}