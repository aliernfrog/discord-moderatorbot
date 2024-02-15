export default function(client, interaction) {
  const component = client.messageComponents.get(interaction.customId);
  if (!component) return;

  component.execute?.(client, interaction);
}