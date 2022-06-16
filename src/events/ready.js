module.exports = {
  name: "ready",
  async execute(client) {
    client.user.setActivity(`${client.guilds.cache.size} servers`, {type:"WATCHING"});
    console.log(`${client.user.tag} | ${client.guilds.cache.size} guilds`);

    process.on("uncaughtException", err => console.log(err));
  }
}