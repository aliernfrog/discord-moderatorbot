module.exports = {
  execute(client, interaction) {
    const contextMenu = client.contextMenus.get(interaction.commandName);
    if (!contextMenu) return interaction.reply({content: "Unknown context menu", ephemeral: true});

    if (contextMenu.guildOnly && !interaction.guild) return interaction.reply({content: "This command is guild-only", ephemeral: true});
    if (contextMenu.permissions && !interaction.channel.permissionsFor(interaction.user).has(contextMenu.permissions)) return interaction.reply({content: `Missing permissions: \`${command.permissions.join("|")}\``, ephemeral: true});

    if (contextMenu.execute) contextMenu.execute(client, interaction);
  }
}