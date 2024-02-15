export default function execute(client, interaction) {
  let command = client.commands.get(interaction.commandName);
  if (interaction.options.getSubcommand(false)) command = client.subcommands.get(`${command.data.name}/${interaction.options.getSubcommand()}`);
  if (!command) return interaction.reply({content: "Unknown command", ephemeral: true});

  if (command.data?.dmPermission == false && !interaction.guild) return interaction.reply({content: "This command can not be used in DMs", ephemeral: true});

  if (command.execute) command.execute(client, interaction);
}