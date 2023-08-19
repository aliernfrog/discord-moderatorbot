const specialChannels = require("./messageCreate/specialChannels.js");
const navigatorChannels = require("./messageCreate/navigatorChannels.js");
const managerEval = require("./messageCreate/managerEval.js");

module.exports = {
  name: "messageCreate",
  execute(client, message) {
    specialChannels.execute(client, message);
    navigatorChannels(client, message);
    managerEval.execute(client, message);
  }
}