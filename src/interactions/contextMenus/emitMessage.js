module.exports = {
  name: "Emit message",
  type: "MESSAGE",
  guildOnly: true,
  permissions: ["MANAGE_MESSAGES"],
  async execute(client, interaction) {
    const message = interaction.options.getMessage("message");
    const guild = await client.guilds.fetch(message.guild.id);
    await guild.members.fetch(message.author.id);
    client.emit("messageCreate", message);
    interaction.reply({content: "Success!", ephemeral: true});
  }
}