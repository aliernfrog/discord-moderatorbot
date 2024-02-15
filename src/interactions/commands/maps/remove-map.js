import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export default {
  data: {
    name: "remove-map",
    description: "Removes a map.",
    options: [
      {
        name: "by-author",
        description: "Removes maps by author ID, can not be undone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "id",
            description: "User ID to delete maps of.",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "by-message",
        description: "Removes a map by message ID, can not be undone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "id",
            description: "Message ID of the map.",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "by-name",
        description: "Removes maps by map name, can not be undone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "name",
            description: "Name of the map.",
            type: ApplicationCommandOptionType.String,
            required: true
          }
        ]
      },
      {
        name: "clear",
        description: "Removes all maps from maps array, can not be undone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "confirm",
            description: "Confirm the action, can not be undone.",
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