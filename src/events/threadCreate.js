const specialForums = require("./threadCreate/specialForums.js");

module.exports = {
  name: "threadCreate",
  async execute(client, ...args) {
    // wait 3 seconds, no idea why tho
    setTimeout(() => {
      specialForums.execute(client, ...args);
    }, 3000);
  }
}