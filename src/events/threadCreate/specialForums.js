module.exports.execute = async (client, thread/*, newlyCreated?*/) => {
  const forum = client.specialForums.get(thread.parentId);
  if (!forum) return;

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
  } catch (_) {
    thread.starterMessage = await thread.awaitMessages({
      filter(msg) { return msg.id === thread.id },
      max: 1,
      time: 60000,
      errors: ["time"]
    })
      .catch(() => { /*message did not arrive in time*/ })?.first?.();
  }
  if (!thread.starterMessage) return;

  /*
  forum.customTrigger(client, thread)
  If this returns true, next rules won't be executed
  */
  const customTrigger = forum.customTrigger?.(client, thread);
  if (customTrigger) return;

  /*
  forum.defaultMessage(client, thread)
  Should be a function returning a message or null
  */
  const defaultMessage = forum.defaultMessage?.(client, thread);
  if (defaultMessage) thread.send(defaultMessage);
}