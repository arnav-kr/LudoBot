import { MessageActionRow, MessageButton, MessageSelectMenu } from "discord.js";

export const confirm = async ({
  interaction = undefined,
  channel,
  to,
  content,
  embeds = [],
  labels: [yes, no] = ["Yes", "No"],
  timeout = 20000,
  ephemeral = false,
}) => {
  let results = {};
  return new Promise(async (resolve, reject) => {
    const options = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("true")
          .setLabel(yes || "Yes")
          .setStyle("SUCCESS"),

        new MessageButton()
          .setCustomId("false")
          .setLabel(no || "No")
          .setStyle("DANGER"),
      );
    let sent;
    if (interaction) sent = await interaction.reply({ content, embeds, components: [options], ephemeral: ephemeral, fetchReply: true });
    else sent = await channel.send({ content, embeds, components: [options], ephemeral: ephemeral });
    const filter = (i) => to.includes(i.user.id) && i.isButton();
    const collector = sent.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async function (interaction) {
      switch (interaction.customId) {
        case "true":
          results[interaction.user.id] = true;
          if (Object.keys(results).length === to.length) {
            collector.stop();
            resolve(results);
          }
          break;
        case "false":
          results[interaction.user.id] = false;
          if (Object.keys(results).length === to.length) {
            collector.stop();
            resolve(results);
          }
          break;
      }
    });
    collector.on('end', async function (_collected, reason) {
      if (reason == "user" || reason == "time") {
        if (reason == "time") {
          let usersThatDidntRespond = to.filter(u => !results[u]);
          channel.send(`Declining to play on behalf of ${usersThatDidntRespond.map(u => `<@${u}>`).join(", ")}`)
            .then(m => m.delete({ timeout: 5000 }));
          usersThatDidntRespond.forEach(u => results[u] = false);
          resolve(results);
        }
      } else {
        reject(reason);
      }
      sent.delete();
    });
  });
};

export const prompt = async ({
  interaction = undefined,
  channel,
  defaultValue,
  to,
  content,
  embeds = [],
  placeholder,
  choices,
  timeout = 30000,
  ephemeral = false,
}) => {
  return new Promise(async (resolve, reject) => {

    let selction = new MessageSelectMenu()
      .setCustomId('selection')
      .setPlaceholder(placeholder || 'Make a Selection')
      .addOptions(choices);

    const options = new MessageActionRow()
      .addComponents(selction);
    let sent;
    if (interaction) sent = await interaction.reply({ content: content, embeds, components: [options], ephemeral: ephemeral, fetchReply: true });
    else sent = await channel.send({ content: content, embeds, components: [options], ephemeral: ephemeral });

    const filter = (i) => to.includes(i.user.id) && i.isSelectMenu();
    const collector = sent.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async function (interaction) {
      switch (interaction.customId) {
        case "selection":
          if (!interaction.isSelectMenu()) break;
          resolve(interaction.values[0])
          collector.stop();
          // await interaction.update({ components: [] });
          await sent.delete();
          break;
      }
    });
    collector.on('end', async function (_collected, reason) {
      if (reason == "user" || reason == "time") {
        if (reason == "time") {
          resolve(defaultValue);
          sent.delete();
        }
      } else {
        reject(reason);
        sent.delete();
      }
    });
  });
}