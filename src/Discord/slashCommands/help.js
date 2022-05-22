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
        cmd = interaction.client.commands.get(arg) || interaction.client?.commands?.get(interaction.client?.aliases?.get(arg)?.name);
      }
      catch (e) {
        console.log(e);
        return;
      }
      if (!cmd) return;
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
  const { category, name, description, usage, aliases, guildOnly, proTip } = command;
  const { prefix } = client.config;
  const embed = new MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(`${prefix}${name}`)
    .setDescription(description || "No description available")
    .addField("Usage", usage || "No usage available", true)
    .addField("Aliases", aliases?.length > 0 ? aliases.map(i => `\`${i}\``).join(", ") : "No aliases", true)
    .addField("Category", category || "None", true)
    .addField("Guild Only", guildOnly ? "Yes" : "No", true)
    .setTimestamp();
  if (proTip) embed.addField("Pro Tip", proTip);
  return embed;
}

function getCommandsEmbed(client) {
  let description = ``;
  let commands = new Map([...client.slashCommands.map(c => c.name = "/" + c), ...client.commands.map(c => c.name = client.config.prefix + c)]);
  commands.forEach(function (command) {
    description += `**${command.name}**: ${command?.description}\n`;
  });

  const cmdEmbed = new MessageEmbed()
    .setColor("#7289DA")
    .setTitle(`Help for Ludo Bot`)
    .setDescription(description)

  return cmdEmbed;
}