const { EmbedBuilder } = require("discord.js");

const falsePositiveHint = "I'm a bot, downvote me if you think that this action is wrong.";

module.exports = {
  //TODO use real id before merging
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
  },
  customTrigger(client, thread) {

    // Vagueness checks
    const vaguenessObj = client.AIUtil.getBugReportVagueness(thread.starterMessage, thread.name);
    const vaguenessValues = Object.values(vaguenessObj);
    const vagueness = vaguenessValues.filter(v => v === true);
    const isCompletelyVague = vagueness.length == vaguenessValues.length;

    // Something is vague, start building the response
    if (vagueness.length) {
      const embed = new EmbedBuilder()
        .setThumbnail(thread.guild.iconURL())
        .setColor("Red")
        .setFooter({ text: falsePositiveHint });
      
      // Post is completely vague, it might be not even a report. Lock the post
      if (isCompletelyVague) embed
        .setTitle("🔒 Vague post")
        .setFields({
          name: "Your post is too vague.",
          value: "Your post does not provide much details and it is hard to understand.\nThis post is now locked."
        }, {
          name: "What's next?",
          value: "Your post may be unlocked or deleted after staff review.\nMeanwhile, you can create another post with proper details."
        });
      else {
        // Post most likely contains a bug report, but its still missing some details
        embed.setTitle(
          (vaguenessObj.description && vaguenessObj.title) ? "❓ Vague report" :
          vaguenessObj.description ? "❓ Vague description" :
          vaguenessObj.title ? "❓ Vague title" :
          /*vaguenessObj.attachments ?*/ "👀 No screenshots or videos" /*:*/
        )
        if (vaguenessObj.description) embed.addFields({
          name: "Your description is vague.",
          value: "Reports without a proper description might be hard for the developer to debug and fix."
        })
        if (vaguenessObj.title) embed.addFields({
          name: "Your title is vague.",
          value: "Report title must contain a short explanation of the bug. Otherwise it might go unnoticed and never be fixed."
        })
        if (vaguenessObj.attachments) embed.addFields({
          name: "Your post has no screenshots or videos.",
          value: "Screenshots and videos make it easier for the developer to understand and reproduce the bug."
        });
      }

      // TODO close if completely vague
      return thread.send({ embeds: [embed] });
    }
  }
}