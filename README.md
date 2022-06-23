# closetmod
A simple Discord moderation bot

# Features
### Media-only channels
Automatically deletes non-media content in a specific channel
### Disable replies
Automatically deletes replies in a specific channel
### Automatically start threads
Automatically starts a thread when a new message is sent in a specific channel
### Channel cooldowns
Advanced cooldowns for channels, supports any duration

# Running
- Clone the repo
- Set bot token in `index.js`
- Set MongoDB URI in `src/db/db.js`
- Set managers array in `src/events/messageCreate/managerEval.js`
- (Optional) Edit the code
- `node index.js`

# Adding a new channel
- Create a new file called `myChannel.js` in `channels` folder
- Use [channel file template](#channel-file) and edit it

# Channel file
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
  autoThread: StartThreadOptions, //automatically starts a thread when a message is sent, see https://discord.js.org/#/docs/discord.js/stable/typedef/StartThreadOptions
  execute(client, message) {...} //will be executed when a new message is sent
}
```
