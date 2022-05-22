import { MessageEmbed } from "discord.js";

export const command = {
  name: "help",
  description: "Shows the Help",
  usage: "help ?[command]",
  aliases: ["h"],
  async run({ msg, args }) {
    if (args[0] && typeof args[0] === "string") {
      let arg = args[0];
      let cmd;
      try {
        cmd = msg.client.commands.get(arg) || msg.client?.commands?.get(msg.client?.aliases?.get(arg)?.name) || interaction.client.slashCommands.get(arg);;
      }
      catch (e) {
        console.log(e);
        return;
      }
      if (!cmd) return;
      return msg.reply({
        embeds: [getSingleCommandEmbed(cmd, msg.client)],
      });
    }

    let embed = getCommandsEmbed(msg.client);
    msg.reply({
      embeds: [embed],
    });
  }
}

function getSingleCommandEmbed(command, client) {
  const { name, description, usage, aliases, guildOnly, proTip } = command;
  const { prefix } = client.config;
  const embed = new MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(`${prefix}${name}`)
    .setDescription(description || "No description available")
    .addField("Usage", usage || "No usage available", true)
    .addField("Aliases", aliases?.length > 0 ? aliases.map(i => `\`${i}\``).join(", ") : "No aliases", true)
    .addField("Guild Only", guildOnly ? "Yes" : "No", true)
    .setTimestamp();
  if (proTip) embed.addField("Pro Tip", proTip);
  return embed;
}

function getCommandsEmbed(client) {
  let description = ``;
  let commands = new Map([...client.commands, ...client.slashCommands]);
  commands.forEach(function (command) {
    description += `**${command.displayName}**: ${command?.description}\n`;
  });

  const cmdEmbed = new MessageEmbed()
    .setColor("#7289DA")
    .setTitle(`Help for Ludo Bot`)
    .setDescription(description)

  return cmdEmbed;
}