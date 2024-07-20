import { ApplicationCommandOptionType } from "discord.js";

export default {
  data: {
    name: "faq",
    description: "Manages FAQ of the current server.",
    options: [
      {
        name: "set-message",
        description: "Sets the message which will include the FAQ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "message-id",
            description: "ID of the message which will include the FAQ. \"CREATE\" to send a new message.",
            type: ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: "channel",
            description: "Channel which includes the FAQ message. Defaults to current channel.",
            type: ApplicationCommandOptionType.Channel
          }
        ]
      },
      {
        name: "add",
        description: "Adds a question to FAQ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "title",
            description: "Title of the question.",
            type: ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: "description",
            description: "Description/answer of the question.",
            type: ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: "auto-response-regex",
            description: "Regex for triggering auto-response.",
            type: ApplicationCommandOptionType.String
          }
        ]
      },
      {
        name: "remove",
        description: "Removes a question from FAQ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "index",
            description: "Index of the question, starts from 1.",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
            required: true
          }
        ]
      },
      {
        name: "edit",
        description: "Edits a question in FAQ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "index",
            description: "Index of the question, starts from 1.",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
            required: true
          },
          {
            name: "title",
            description: "New title of the question.",
            type: ApplicationCommandOptionType.String
          },
          {
            name: "description",
            description: "New description/answer of the FAQ.",
            type: ApplicationCommandOptionType.String
          },
          {
            name: "auto-response-regex",
            description: "New regex to trigger auto response. \"NONE\" to remove the regex.",
            type: ApplicationCommandOptionType.String
          }
        ]
      },
      {
        name: "move",
        description: "Moves a question in FAQ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "index",
            description: "Current index of the question to move, starts from 1.",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
            required: true
          },
          {
            name: "to-index",
            description: "Index to swap with the question.",
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
            required: true
          }
        ]
      }
    ]
  }
}