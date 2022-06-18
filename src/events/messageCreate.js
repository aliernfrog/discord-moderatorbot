const specialChannels = require("./messageCreate/specialChannels.js");
const managerEval = require("./messageCreate/managerEval.js");

module.exports = {
  name: "messageCreate",
  execute(client, message) {
    specialChannels.execute(client, message);
    managerEval.execute(client, message);
  }
}