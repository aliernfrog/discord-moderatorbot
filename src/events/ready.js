module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // hardcoded on purpose
    // replace '2' with '${client.guilds.cache.size}' when needed
    client.user.setActivity(`2 servers`, {type:"WATCHING"});
    console.log(`${client.user.tag} | ${client.guilds.cache.size} guilds`);

    process.on("uncaughtException", err => console.log(err));
  }
}