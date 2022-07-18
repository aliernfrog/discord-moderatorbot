module.exports = {
  token: process.env.DISCORD_TOKEN,
  managers: process.env.MANAGERS.split("_"),
  evalPrefix: "modbot!eval ",
  defaultCooldownMessage: "This channel has a cooldown, you won't be able to send messages here until %TIME%",
  defaultInformTimeout: 5000
}