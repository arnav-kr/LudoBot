export const command = {
  name: 'deploy',
  description: 'Deploy Slash Commands in the Current Guild',
  usage: 'deploy ?[rm]',
  userPerms: ['ADMINISTRATOR'],
  aliases: ['dp', 'dply'],

  async run({ msg, args }) {

    let sent = await msg.reply({ content: `${msg.client.getEmoji("sit_loading")} Working On It...`, });
    if (msg.channel.type === 'DM') sent.edit({ content: "You can't deploy commands in DM.", });

    let arg = args[0] || "null";

    if ((arg.toLowerCase() == "global") && (msg.client.config.owners.includes(msg.author.id))) {
      if (await msg.client.registerSlashCommand({ commands: msg.client.slashCommands.map(c => c) })) sent.edit({ content: "Deploying all commands globally. it may take a while.", embeds: [] });
      else sent.edit({ content: 'Failed to deploy global commands.', embeds: [] });
    }
    else {
      let commands = [];
      if (arg == "*" || arg.toLowerCase() == "all" || arg == "null") {
        msg.client.slashCommands.forEach(c => {
          commands.push(c);
        });
      }
      else {
        commands = [];
      }

      msg.client.registerSlashCommand({
        guildId: msg.guild.id,
        commands
      }).then(b => {
        if (b && commands.length)
          sent.edit({ content: 'Successfully registered SlashCommand(s).', embeds: [] });
        else if (b) sent.edit({ content: 'Successfully removed all slash commands.', embeds: [] });
        else sent.edit({ conetnt: 'Failed to deploy SlashCommands.', embeds: [] });
      });
    }
  }
}
