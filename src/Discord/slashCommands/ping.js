export const command = {
  name: "ping",
  description: "Ping Me!",

  async run({ interaction }) {
    let sent = await interaction.reply({
      content: `${interaction.client.getEmoji("sit_bouncing_cat")} Pong!`,
      fetchReply: true,
    });
    try {
      sent.edit(`${interaction.client.getEmoji("sit_bouncing_cat")} Pong! | Heartbeat : **${interaction.client.ws.ping}ms** | Roundtrip latency : **${sent.createdTimestamp - interaction.createdTimestamp}ms**.`);
    } catch (e) { }
  }
}
