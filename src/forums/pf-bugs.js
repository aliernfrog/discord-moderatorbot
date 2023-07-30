const { EmbedBuilder } = require("discord.js");
const knownBugs = require("../ai/pf/knownBugs.js");

module.exports = {
  //TODO use real id before merging
  id: "1130139025232117810",
  execute: [
    "violationChecks"
  ],
  defaultMessage(_, thread) {
    if (thread.starterMessage.author.moderator) return;
    
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
  async violationChecks(client, thread) {
    if (thread.starterMessage.author.moderator) return;
    
    // Array of embed field objects
    const warnings = [];
    
    /* Array of {
      auditLogReason: "short reason to show in audit log",
      embedField: embed field object
    }*/
    const lockReasons = [];
    
    // Vagueness checks
    const vaguenessObj = client.AIUtil.getBugReportVagueness(thread.starterMessage, thread.name);
    const vaguenessValues = Object.values(vaguenessObj);
    const vagueness = vaguenessValues.filter(v => v === true);
    const isCompletelyVague = vagueness.length == vaguenessValues.length;

    // Something is vague
    if (vagueness.length) {
      // Post is completely vague, it might be not even a report. Lock the post
      if (isCompletelyVague) {
        lockReasons.push({
          auditLogReason: "Vague post",
          embedField: {
            name: "❓ Your post is too vague.",
            value: "Your post does not provide enough information."
          }
        });
      } else {
        // Post most likely contains a bug report, but its still missing some details
        if (vaguenessObj.description) warnings.push({
          name: "❓ Your description is vague.",
          value: "Reports without a proper description might be hard for the developer to debug and fix."
        });
        if (vaguenessObj.title) warnings.push({
          name: "❓ Your title is vague.",
          value: "Post title must contain a short explanation of the bug. Otherwise it might go unnoticed and never be fixed."
        });
        if (vaguenessObj.attachments) warnings.push({
          name: "👀 Your post has no screenshots or videos.",
          value: "Screenshots and videos make it easier for the developer to understand and reproduce the bug."
        });
      }
    }

    // Multiple tags checks
    // Currently, only one tag is usually enough for a bug report
    if (thread.appliedTags?.length > 1) warnings.push({
      name: "🏷️ Your post has too many tags.",
      value: "Having many tags on your post makes it harder to sort through other reports in the forum. Please edit your post and only pick **one** tag that best describes your issue."
    });

    // All-in-one bug post checks
    const hasMultiple = client.AIUtil.hasMultipleBugs(thread.starterMessage, thread.name);

    // Post contains multiple bugs
    if (hasMultiple) {
      lockReasons.push({
        auditLogReason: "Multiple bug reports in single post",
        embedField: {
          name: "💥 Your post has multiple bug reports.",
          value: "Posting multiple bug reports in a single post will make those bugs harder to track.\nPlease open separate posts for each bug."
        }
      });
    }

    // Known bugs checks
    
    // combine title and message content so we dont have to check for both
    // filter(lowercaseContent, lowercaseArgs)
    const content = `${thread.name} ${thread.starterMessage.content?.toLowerCase?.() ?? ""}`;
    const args = content.replace("\n"," ").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" "); // no newlines and punctuations
    const knownBug = knownBugs.find(bug => {
      return bug.filter(content, args);
    });

    if (knownBug) {
      lockReasons.push({
        auditLogReason: `Known bug: ${knownBug.name}`,
        embedField: {
          name: "💾 Your post is a duplicate.",
          value: `This bug was already reported in [this thread](<${knownBug.thread}>).`
        }
      });
    }

    if (!warnings.length && !lockReasons.length) return; // Nothing to do, return false to execute next scripts

    const isLocking = lockReasons.length > 0;
    const embed = new EmbedBuilder()
      .setTitle(
        isLocking ? "🔒 Your post is now locked"
        : "⚠️ Your post failed to meet the guidelines"
      )
      .setThumbnail(thread.guild.iconURL())
      .setColor(isLocking ? "Red" : "Yellow")
      .addFields(
        isLocking ? lockReasons.map(r => r.embedField)
        : warnings
      );

    if (isLocking) embed.setFooter({
      text: "Your post may be unlocked or removed after staff review."
    });

    await thread.send({ embeds: [embed] });
    
    if (isLocking) {
      const logReason = lockReasons.map(r => r.auditLogReason).join(", ");
      
      await thread.lock(logReason);

      const logEmbed = new EmbedBuilder()
        .setTitle(`**🔒 Bug report locked:** ${thread.name}`)
        .setColor("Red")
        .setDescription(logReason)
        .setFooter({
          text: `Created by ${thread.starterMessage.author.username}`,
          iconURL: thread.starterMessage.author.avatarURL()
        });
      
      await client.ModLogUtil.log(client, thread.guild.id, logEmbed, true, thread.starterMessage);
    }
    
    return true;
  }
}