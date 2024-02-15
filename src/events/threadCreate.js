import handleSpecialForum from "./threadCreate/specialForums.js";
import handleNavigatorChannel from "./threadCreate/navigatorChannels.js";

export default {
  name: "threadCreate",
  async execute(client, ...args) {
    // wait half a second, no idea why tho
    setTimeout(() => {
      handleSpecialForum(client, ...args);
    }, 500);

    handleNavigatorChannel(client, ...args);
  }
}