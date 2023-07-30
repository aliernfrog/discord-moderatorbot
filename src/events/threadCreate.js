const specialForums = require("./threadCreate/specialForums.js");

module.exports = {
  name: "threadCreate",
  async execute(client, ...args) {
    // wait half a second, no idea why tho
    setTimeout(() => {
      specialForums.execute(client, ...args);
    }, 500);
  }
}