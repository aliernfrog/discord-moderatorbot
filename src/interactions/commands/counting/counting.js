import { ApplicationCommandOptionType } from "discord.js";

export default {
  data: {
    name: "counting",
    description: "Sends information about counting of current server.",
    options: [
      {
        name: "milestones",
        description: "Sends information about counting milestones of this server.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "user-stats",
        description: "Sends counting statistics of a user.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "User to send statistics of, defaults to you.",
            type: ApplicationCommandOptionType.User
          }
        ]
      }
    ],
    dmPermission: false
  }
}