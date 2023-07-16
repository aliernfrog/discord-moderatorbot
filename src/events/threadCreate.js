module.exports = {
  name: "threadCreate",
  //not checking for newlyCreated, incase bot misses a thread
  execute(client, thread/*, newlyCreated?*/) {
    const forum = client.specialForums.get(thread.parentId);
    if (!forum) return;

    /*
    forum.defaultMessage(client, thread)
    Should be a function returning a message or null
    */
    const defaultMessage = forum.defaultMessage?.(client, thread);
    if (defaultMessage) thread.send(defaultMessage);
  }
}