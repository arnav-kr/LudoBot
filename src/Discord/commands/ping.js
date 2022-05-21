export const command = {
  name: "ping",
  description: "Pings the Bot",
  usage: "ping",
  async run({ msg, args }) {
    let sent = await msg.channel.send(`${msg.client.getEmoji("sit_bouncing_cat")} Pong!`)
    sent.edit(`${msg.client.getEmoji("sit_bouncing_cat")} Pong! | Heartbeat : **${msg.client.ws.ping}ms** | Roundtrip latency : **${sent.createdTimestamp - msg.createdTimestamp}ms**.`);
  }
}