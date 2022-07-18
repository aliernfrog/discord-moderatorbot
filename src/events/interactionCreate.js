const { InteractionType } = require("discord.js");
const command = require("./interactionCreate/command.js");

module.exports = {
  name: "interactionCreate",
  execute(client, interaction) {
    if (interaction.type === InteractionType.ApplicationCommand) command.execute(client, interaction);
  }
}