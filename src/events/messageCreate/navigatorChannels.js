import { MessageType } from "discord.js";

export default function execute(client, message) {
  const channel = client.navigatorChannels.get(message.channel.id);
  if (!channel) return;

  if (message.type === MessageType.ThreadCreated) message.delete();
}