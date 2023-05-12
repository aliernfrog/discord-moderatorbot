const mapExtensions = [".zip"];
const imageExtensions = [".png",".webp",".jpg",".jpeg",".gif"];

module.exports = {
  id: "968221893792522240",
  async execute(client, message) {
    const attachments = [...message.attachments.values()] || [];
    const maps = attachments.filter(attachment => mapExtensions.some(extension => attachment.name.toLowerCase().endsWith(extension)));
    const images = attachments.filter(attachment => imageExtensions.some(extension => attachment.name.toLowerCase().endsWith(extension)));

    if (maps.length < 1 && !message.author.moderator) return message.inform(`You need to post map file (${mapExtensions.join("|")})`);
    if (maps.length > 1 && !message.author.moderator) return message.inform("You can't post multiple map files in the same message");
    if (images.length < 1 && !message.author.moderator) return message.inform("You need to post 1-3 screenshots of your map");

    if (maps[0] && images[0]) {
      const mapName = client.f.getFileName(maps[0].name);
      await client.db.addMap(mapName, message);
      await message.react("<:upvote:968963540117512252>");
      await message.react("<:downvote:968963600611934259>");
      if (!message.hasThread) message.startThread({name: mapName});
    }
  }
}