import { EmbedBuilder } from "discord.js";
import handleSpecialChannel from "./messageCreate/specialChannels.js";
import handleNavigatorChannel from "./messageCreate/navigatorChannels.js";
import handleManagerEval from "./messageCreate/managerEval.js";

export default {
  name: "messageCreate",
  execute(client, message) {
    handleSpecialChannel(client, message);
    handleNavigatorChannel(client, message);
    handleManagerEval(client, message);

    if (message.guild?.id == "752538330528481351") {
      const trigger1 = ["polyfield", "poly", "game"];
      const trigger2 = ["googleplay", "google play", "playstore", "play store", "market", "store", "gone", "download"];
      const content = (message.content ?? "").toLowerCase().replace("  ", " ");
      if (trigger1.some(t => content.includes(t)) && trigger2.some(t => content.includes(t))) {
        const embed = new EmbedBuilder()
          .setTitle("Polyfield is currently unavailable in Play Store")
          .setColor("#ff8530")
          .setThumbnail("https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png")
          .setDescription("Polyfield is currently unavailable for download on the Play Store due to some policy changes <:discordok:898603791157436447>\n\n▶ [DOWNLOAD](https://www.mediafire.com/file/tpksncx44uwp5xk/Polyfield_0.5.0_Backup.apk/file) the game from [HERE](https://www.mediafire.com/file/tpksncx44uwp5xk/Polyfield_0.5.0_Backup.apk/file) in the meantime.")
          .setFooter({ text: "Polyfield will be back in the Play Store in the next update" });
        message.channel.send({
          content: `<@${message.author.id}>`,
          embeds: [embed]
        });
      }
    }
  }
}
