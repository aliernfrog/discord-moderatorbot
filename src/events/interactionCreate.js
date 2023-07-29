const { InteractionType } = require("discord.js");

const command = require("./interactionCreate/command.js");
const messageComponent = require("./interactionCreate/messageComponent.js");

module.exports = {
  name: "interactionCreate",
  execute(client, interaction) {
    
    switch (interaction.type) {
      case InteractionType.ApplicationCommand:
        command.execute(client, interaction);
        break;
      case InteractionType.MessageComponent:
        messageComponent.execute(client, interaction);
        break;
    }
    
  }
}