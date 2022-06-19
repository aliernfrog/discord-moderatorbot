module.exports = {
  data: {
    name: "remove-map",
    description: "Remove a map",
    options: [
      {
        name: "by-message",
        description: "Remove a map by message ID",
        type: "SUB_COMMAND",
        options: [
          {
            name: "id",
            description: "Message ID",
            type: "STRING",
            required: true
          }
        ]
      },
      {
        name: "by-name",
        description: "Remove a map by map name",
        type: "SUB_COMMAND",
        options: [
          {
            name: "name",
            description: "Map name",
            type: "STRING",
            required: true
          }
        ]
      }
    ]
  }
}