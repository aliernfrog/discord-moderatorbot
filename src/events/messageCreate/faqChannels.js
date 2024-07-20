import { MessageType } from "discord.js";

export default async function execute(client, message) {
  if (!message?.guild?.id || (message?.type !== MessageType.ThreadCreated) || (message.author.id !== client.user.id)) return;
  
  const data = await client.db.guildData(message.guild.id);
  if (data?.faq?.channelId !== message.channel?.id) return;
  
  message.delete();
}