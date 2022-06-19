module.exports = {
  execute(client, interaction) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply({content: "Unknown command", ephemeral: true});

    if (command.guildOnly && !interaction.guild) return interaction.reply({content: "This command is guild-only", ephemeral: true});
    if (command.permissions && !interaction.channel.permissionsFor(interaction.user).has(command.permissions)) return interaction.reply({content: `Missing permissions: \`${command.permissions.join("|")}\``, ephemeral: true});

    if (command.execute) command.execute(client, interaction);
  }
}