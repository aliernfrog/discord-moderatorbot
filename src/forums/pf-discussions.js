const { EmbedBuilder } = require("discord.js");

let tagTypes = {};

module.exports = {
  id: "1019650643696296047",
  execute: [
    "violationChecks"
  ],
  async init(client) {
    const forum = await client.channels.fetch(module.exports.id);
    const findByName = (name) =>
      forum.availableTags?.find?.(
        tag => tag.name.toLowerCase().includes(name)
      )?.id;
    tagTypes = {
      featureRequest: findByName("feature request"),
      feedback: findByName("thoughts")
    }
  },
  defaultMessage(_, thread) {
    if (thread.starterMessage.author.moderator) return;
    
    const embed = new EmbedBuilder()
      .setTitle("ℹ️ Reminder")
      .setThumbnail(thread.guild.iconURL())
      .setColor("#00B3FF")
      .setDescription(
        "Thank you for your submission, make sure your post follows **[forum guidelines](https://discord.com/channels/752538330528481351/1019683152572190780/1124439474005356614)** and **[server rules](https://discord.com/channels/752538330528481351/893576664913678357/1020440465805430824)**."
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

    // Post type checks
    // can be null (unknown), "featureRequest" or "feedback"
    thread.appliedTags ??= [];
    const postType = thread.appliedTags.includes(tagTypes.featureRequest) ? "featureRequest"
      : thread.appliedTags.includes(tagTypes.feedback) ? "feedback"
      : null;

    if (postType == "featureRequest" || postType == "feedback") {
      const vaguenessObj = client.AIUtil.getSuggestionVagueness(thread.starterMessage, thread.name);
      const vaguenessValues = Object.values(vaguenessObj);
      const vagueness = vaguenessValues.filter(v => v === true);
      // For feature request posts, title and description must not be vague
      // For feedback posts, title and screenshots aren't important, description must not be vague
      const isCompletelyVague = (postType == "feedback") ? vaguenessObj.description
        : vaguenessObj.title && vaguenessObj.description;
      
      // Vagueness checks
      if (isCompletelyVague) {
        lockReasons.push({
          auditLogReason: "Vague post",
          embedField: {
            name: "❓ Your post is too vague.",
            value: "Your post does not provide enough information."
          }
        });
      } else if (postType != "feedback") {
        if (vaguenessObj.description) warnings.push({
          name: "❓ Your description is vague.",
          value: "Feature requests without a proper description might be hard to figure out."
        });
        if (vaguenessObj.title) warnings.push({
          name: "❓ Your title is vague.",
          value: "Post title must contain a short explanation of the feature request. Otherwise it might go unnoticed."
        });
        if (vaguenessObj.attachments) warnings.push({
          name: "👀 Your post has no screenshots or videos.",
          value: "Screenshots and videos make it easier to understand the feature request."
        });
      }

      // Multiple feature request in single post checks
      // Only for featureRequest type posts
      if (postType == "featureRequest") {
        const hasMultipleFeatureRequests = client.AIUtil.hasMultipleFeatureRequests(thread.starterMessage, thread.name);
        if (hasMultipleFeatureRequests) {
          lockReasons.push({
            auditLogReason: "Multiple feature requests in single post",
            embedField: {
              name: "💥 Your post has multiple feature requests.",
              value: "Multiple feature requests in a single post make it difficult to track them. Please create separate posts for each request."
            }
          });
        }
      }
    }

    // Multiple tags checks
    // Currently, only one tag is usually enough for a discussion
    if (thread.appliedTags?.length > 1) warnings.push({
      name: "🏷️ Your post has too many tags.",
      value: "Having many tags on your post makes it harder to sort through other discussions in the forum. Please edit your post and only pick **one** tag that best describes the topic."
    });

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
      )
      .setFooter({
        text: isLocking ? "Your post may be unlocked or removed after staff review."
          : "You can edit your post to solve these issues."
      });

    await thread.send({ embeds: [embed] });
    
    if (isLocking) {
      const logReason = lockReasons.map(r => r.auditLogReason).join(", ");
      
      await thread.lock(logReason);

      const logEmbed = new EmbedBuilder()
        .setTitle(`**🔒 Discussion locked:** ${thread.name}`)
        .setColor("Red")
        .setDescription(logReason)
        .addFields({
          name: "Post type",
          value: postType ?? "Unknown"
        })
        .setFooter({
          text: `Created by ${thread.starterMessage.author.username}`,
          iconURL: thread.starterMessage.author.avatarURL()
        });
      
      await client.ModLogUtil.log(client, thread.guild.id, logEmbed, true, thread.starterMessage);
    }
    
    return true;
  }
}