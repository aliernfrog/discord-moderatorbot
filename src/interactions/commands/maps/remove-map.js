const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: {
    name: "remove-map",
    description: "Removes a map",
    options: [
      {
        name: "by-author",
        description: "Removes a map by author ID, can NOT be undone",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "id",
            description: "User ID",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "by-message",
        description: "Removes a map by message ID, can NOT be undone",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "id",
            description: "Message ID",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "by-name",
        description: "Removes a map by map name, can NOT be undone",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "name",
            description: "Map name",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "clear",
        description: "Clears maps array, can NOT be undone",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "confirm",
            description: "Confirm the action, can NOT be undone",
            type: ApplicationCommandOptionType.Boolean,
            required: true
          }
        ]
      }
    ],
    dmPermission: false,
    defaultMemberPermissions: [PermissionFlagsBits.ManageMessages]
  }
}