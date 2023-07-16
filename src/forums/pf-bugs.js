const { EmbedBuilder } = require("discord.js");

module.exports = {
  id: "1130139025232117810",
  defaultMessage(_, thread) {
    const embed = new EmbedBuilder()
      .setTitle("ℹ️ Reminder")
      .setThumbnail(thread.guild.iconURL())
      .setColor("#00B3FF")
      .setDescription(
        "Thank you for your submission, make sure your post follows **[forum guidelines](https://discord.com/channels/752538330528481351/1127609733977739384/1127609733977739384)** and **[server rules](https://discord.com/channels/752538330528481351/893576664913678357/1020440465805430824)**."
      )
      .setFooter({
        text: "Posts not following guidelines may be deleted by staff."
      });
    return { embeds: [embed] }
  }
}