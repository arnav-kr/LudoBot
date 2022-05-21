export const event = {
  name: 'interactionCreate',

  execute(client, interaction) {
    if (!(interaction.isAutocomplete() || interaction.isCommand())) return;
    if (interaction.user.bot) return;

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!(cmd && client.user)) return;
    // Run The Command
    try {
      if (interaction.isAutocomplete()) {
        if (!cmd.autocompleteRun || interaction.responded) return;
        cmd.autocompleteRun({ client, interaction });
      }
      else if (!interaction.replied) {
        cmd.run({ client, interaction });
      }
    }
    catch (err) {
      console.log(err);
      if (err.interaction) interaction.reply(err.interaction);
    }
  }
}