module.exports = {
  id: "1019668981457625189",
  execute(client, message) {
    if (!message.author.moderator) message.delete();
  }
}