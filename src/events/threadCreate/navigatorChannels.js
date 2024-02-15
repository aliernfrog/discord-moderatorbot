export default async function execute(client, thread) {
  const channel = client.navigatorChannels.get(thread.parentId);
  if (!channel) return;

  const message = await channel.generateMessage?.(client, thread.parent);
  if (!message) return;

  const chn = await client.channels.fetch(channel.id);
  const msg = await chn.messages.fetch(channel.messageId);

  msg.edit(message);
}