# closetmod
A simple Discord moderation bot

## ⚙️ Running
- Clone the repo
- Edit `src/config.js`
- (Optional) Edit the code
- `node index.js`

## #️⃣ Channel file
`src/channels/someChannel.js`
```js
module.exports = {
  id: String, //id of the channel
  mediaOnly: Boolean, //deletes messages that don't have attachments
  linksOnly: Boolean, //deletes messages that don't have links
  disableReplies: Boolean, //deletes replies
  suggestThreads: Boolean, //suggests usage of threads when deleting a message in media-only, links-only channels or when deleting replies
  cooldown: {
    duration: 60000, //duration of cooldown in miliseconds
    message: "Custom message" //custom message, uses default if not defined
  },
  autoThread: StartThreadOptions, //automatically starts a thread when a message is sent, see https://discord.js.org/#/docs/discord.js/main/typedef/StartThreadOptions
  execute(client, message) {...} //will be executed when a new message is sent
}
```

## ⌨️ Command file
`src/interactions/commands/someFolder/someCommand.js`<br>
subcommands: `src/interactions/subcommands/parentCommand/someSubcommand.js`
```js
module.exports = {
  data: ApplicationCommandData, //see https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandData
  guildOnly: Boolean, //only allows the command in guilds
  permissions: PermissionResolvable, //permission user needs to use the command, see https://discord.js.org/#/docs/discord.js/main/typedef/PermissionResolvable
  execute(client, interaction) {...} //will be executed when user runs the command
}
```