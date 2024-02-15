import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export async function log(client, guildId, embeds, needsReview, contextMessage) {
  const guildConfig = client.guildConfig[guildId];
  if (!guildConfig?.logChannel) return console.warn(`${guildId} doesn't have a logChannel!`);

  embeds = [].concat(embeds);
  const baseMessage = { embeds: embeds }
  const contextMessageURL = client.f.buildMessageURL(contextMessage);
  
  const logChannel = await client.channels.fetch(guildConfig.logChannel);
  
  if (guildConfig.modReviewChannel) {
    const modReviewChannel = await client.channels.fetch(guildConfig.modReviewChannel);
    await modReviewChannel.send(
      addComponents(baseMessage, contextMessageURL, true)
    );
  }

  await logChannel.send(
    addComponents(baseMessage, contextMessageURL, false)
  );
}

function addComponents(msg, contextMessageURL, isModReviewMessage) {
  const message = { ... msg } // dupe the object so we dont modify original
  
  const row = new ActionRowBuilder();

  if (isModReviewMessage) row.addComponents(
    new ButtonBuilder()
      .setLabel("Mark as reviewed")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("modlog_reviewed")
  );

  if (contextMessageURL) row.addComponents(
    new ButtonBuilder()
      .setLabel("Context")
      .setStyle(ButtonStyle.Link)
      .setURL(contextMessageURL)
  );

  message.components ??= [];
  message.components.push(row);

  return message;
}