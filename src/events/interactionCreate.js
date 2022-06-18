const contextMenu = require("./interactionCreate/contextMenu.js");

module.exports = {
  name: "interactionCreate",
  execute(client, interaction) {
    if (interaction.isContextMenu()) contextMenu.execute(client, interaction);
  }
}