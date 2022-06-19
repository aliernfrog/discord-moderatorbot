const command = require("./interactionCreate/command.js");
const contextMenu = require("./interactionCreate/contextMenu.js");

module.exports = {
  name: "interactionCreate",
  execute(client, interaction) {
    if (interaction.isCommand()) command.execute(client, interaction);
    else if (interaction.isContextMenu()) contextMenu.execute(client, interaction);
  }
}