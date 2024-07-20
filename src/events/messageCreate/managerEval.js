import config from "../../values/config.js";

export default function execute(client, message) {
  const prefix = config.evalPrefix.replace("{ID}", client.user.id);
  if (!message.content.startsWith(prefix)) return;
  if (!config.managers.includes(message.author.id)) return;

  const code = message.content.replace(prefix, "");
  try {
    eval(`(async () => { ${code} })()`);
  } catch (e) {
    console.log(e);
  }
}