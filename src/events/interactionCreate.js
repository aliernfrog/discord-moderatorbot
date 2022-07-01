const command = require("./interactionCreate/command.js");

module.exports = {
  name: "interactionCreate",
  execute(client, interaction) {
    if (interaction.isApplicationCommand()) command.execute(client, interaction);
  }
}