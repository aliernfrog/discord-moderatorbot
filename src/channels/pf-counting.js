module.exports = {
  id: "1076845847813292082",
  disableReplies: true,
  async execute(client, message) {
    const isNumber = !isNaN(message.content ?? "");
    if (!isNumber) {
      if (!message.author.moderator) message.delete();
      return;
    }
    
    const data = await client.db.guildData(message.guild.id);
    const lastCount = parseInt(data.counting?.lastCount ?? 0);
    const nextCount = lastCount+1;
    const countFromUser = parseInt(message.content.trim());
    if (countFromUser != nextCount) return message.inform(`next count is **${nextCount}**`, 5000, true);

    if (data.counting?.lastUserId === message.author.id) return message.inform("it's not your turn", 5000, true);

    data.counting.lastCount = nextCount;
    data.counting.lastUserId = message.author.id;

    const isMilestone = nextCount == 1 || ((nextCount % 100) === 0);
    if (isMilestone) {
      data.counting.milestones.set(nextCount.toString(), {
        userId: message.author.id,
        channelId: message.channel.id,
        messageId: message.id
      });
      message.channel.send(`<@${message.author.id}> reached **${nextCount}** milestone! Check </counting milestones:1> for more details 🏆`);
    }

    const userData = data.counting.users.get(message.author.id) ?? {
      counts: 0
    };
    userData.counts = parseInt(userData.counts)+1;
    data.counting.users.set(message.author.id, userData);
    
    data.save();
  }
}