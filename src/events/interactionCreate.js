import { InteractionType } from "discord.js";

import handleCommand from "./interactionCreate/command.js";
import handleMessageComponent from "./interactionCreate/messageComponent.js";

export default {
  name: "interactionCreate",
  execute(client, interaction) {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand:
        handleCommand(client, interaction);
        break;
      case InteractionType.MessageComponent:
        handleMessageComponent.execute(client, interaction);
        break;
    }
  }
}