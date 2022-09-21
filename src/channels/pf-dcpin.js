module.exports = {
  id: "1019683152572190780",
  execute(client, message) {
    if (!message.author.moderator) message.delete();
  }
}