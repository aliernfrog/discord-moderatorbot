import "dotenv/config";
import { ApplicationCommandManager } from "discord.js";
import GeneralUtil from "./src/utils/GeneralUtil.js";

const endpoint = `https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`;

(async () => {
  const commands = await GeneralUtil.readCommands();
  
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      commands.map(cmd => ({
        ...(ApplicationCommandManager.transformCommand(cmd.data))/*,
        integration_types: cmd.data?.integration_types ?? [0,1],
        contexts: [0,1,2]*/
      }))
    )
  });
  
  console.log(await response.json());
  console.log("Pushed commands.");
})();