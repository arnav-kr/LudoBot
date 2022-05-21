export const event = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.content.startsWith(`<@${message.client.user?.id}>`)) return message.reply(`Hi there ${message.author.username}, My prefix is \`${client.config.prefix}\`, Type \`${client.config.prefix}help\` for help. `);
    if (!message.content.toLowerCase().startsWith(client.config.prefix) || !message.content) return;

    const args = message.content
      .slice(client.config.prefix.length)
      .trim().split(/ +|\n/);

    const cmdName = (args.shift() || '').toLowerCase();
    const cmd = client.commands.get(cmdName) || client.aliases.get(cmdName);
    if (!cmd || message.author.bot) return;
    
    // Run the Command
    try {
      const content = () => message.content
        .substring(client.config.prefix.length)
        .replace(/^[\s+]?/, "")
        .replace(cmdName + ' ', '');
      cmd.run({
        msg: message,
        commandName: cmdName,
        content,
        args,
      });
    }
    catch (err) {
      if (err.message) message.reply(err.message);
    }
  }
}