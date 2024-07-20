import { PermissionFlagsBits } from "discord.js";

export default async function execute(client, thread/*, newlyCreated?*/) {
  const forum = client.specialForums.get(thread.parentId);
  if (!forum) return;

  thread.forum = forum;
  thread.lock = async (reason) => {
    await thread.setLocked(true, reason);
    return await thread.setArchived(true, reason);
  }

  /*
  starter message might arrive late in specific cases
  if that is the case, fetchStarterMessage will throw unknown message error

  in that case, listen to messages and try to catch the message which has the same id as the thread
  if its found, set it as starterMessage and continue
  return if its not found or no matching message arrived in 60 seconds

  TODO maybe delete thread if starterMessage failed?
  */
  
  try {
    thread.starterMessage = await thread.fetchStarterMessage();
  } catch {
    thread.starterMessage = await thread.awaitMessages({
      filter(msg) { return msg.id === thread.id },
      max: 1,
      time: 60000,
      errors: ["time"]
    })
      .catch(() => { /*message did not arrive in time*/ })?.first?.();
  }
  if (!thread.starterMessage) return;

  try {
    thread.starterMessage.author.moderator = thread.permissionsFor(thread.starterMessage.author).has(PermissionFlagsBits.ManageThreads);
  } catch {
    thread.starterMessage.author.moderator = false;
  }

  if (forum.execute?.length) {
    for (const funcName of forum.execute) {
      const func = forum[funcName];
      if (!func) console.warn(`${thread.id} has no function ${funcName}!`);
      const res = await func?.(client, thread);
      if (res) return;
    }
  }

  /*
  forum.defaultMessage(client, thread)
  Should be a function returning a message
  */
  const defaultMessage = await forum.defaultMessage?.(client, thread);
  if (defaultMessage) await thread.send(defaultMessage);
}