import { MessageEmbed } from "discord.js";

export const command = {
  name: "help",
  description: "Shows the Help",
  usage: "help ?[command]",
  aliases: ["h"],
  options: [
    {
      name: 'command',
      description: 'Name Of Command',
      type: 'STRING',
      required: false,
    }
  ],
  async run({ interaction }) {
    let arg = interaction.options.getString("command");
    if (arg) {
      let cmd;
      try {
        cmd = interaction.client.commands.get(arg) || interaction.client?.commands?.get(interaction.client?.aliases?.get(arg)?.name) || interaction.client.slashCommands.get(arg);
      }
      catch (e) {
        console.log(e);
        return;
      }
      if (!cmd) return interaction.reply({ content: "There is no such command!", ephemeral: true });
      return interaction.reply({
        embeds: [getSingleCommandEmbed(cmd, interaction.client)],
      });
    }

    let embed = getCommandsEmbed(interaction.client);
    interaction.reply({
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