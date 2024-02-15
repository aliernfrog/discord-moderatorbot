import { ButtonStyle } from "discord.js";

export default {
  name: "modlog_reviewed",
  execute(_, interaction) {
    const message = interaction.message;
    const reviewedButton = message.components[0].components[0];
    
    reviewedButton.data.label = `Reviewed by ${interaction.user.username}`;
    reviewedButton.data.style = ButtonStyle.Success;
    reviewedButton.data.disabled = true;
    
    interaction.update({
      embeds: message.embeds,
      components: message.components
    });
  }
}