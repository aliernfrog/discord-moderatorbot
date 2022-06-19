module.exports = {
  data: {
    name: "Emit message",
    type: "MESSAGE"
  },
  guildOnly: true,
  permissions: ["MANAGE_MESSAGES"],
  execute(client, interaction) {
    const message = interaction.options.getMessage("message");
    client.emit("messageCreate", message);
    interaction.reply({content: "Success!", ephemeral: true});
  }
}