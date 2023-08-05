module.exports = {
  id: "1137309059075280943",
  messageId: "1137309415071031387",
  async generateMessage(client, channel) {
    const threads = (await channel.threads.fetch()).threads;
    
    const content = [
      "# ❓ Frequently Asked Questions",
      "Click a question below to see its answer.",
      "",
      threads.map(thread => {
        const link = client.f.buildChannelURL(thread);
        return `### - [${thread.name}](${link})`;
      }).join("\n\n")
    ].join("\n");

    return content;
  }
}