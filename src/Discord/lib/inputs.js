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
  onTimeout = () => { },
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
    const filter = (i) => {
      if (to.includes(i.user.id) && i.isButton()) {
        return true;
      }
      else {
        i.reply({ content: "This is Not For You!", ephemeral: true });
        return false;
      }
    }
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
          usersThatDidntRespond.forEach(u => results[u] = false);
          onTimeout(interaction);
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
  timeout = 20000,
  ephemeral = false,
  onTimeout = () => { },
}) => {
  return new Promise(async (resolve, reject) => {
    if (!defaultValue) defaultValue = choices[0].value;
    let selction = new MessageSelectMenu()
      .setCustomId('selection')
      .setPlaceholder(placeholder || 'Make a Selection')
      .addOptions(choices);

    const options = new MessageActionRow()
      .addComponents(selction);
    let sent;
    if (interaction) sent = await interaction.reply({ content: content, embeds, components: [options], ephemeral: ephemeral, fetchReply: true });
    else sent = await channel.send({ content: content, embeds, components: [options], ephemeral: ephemeral });

    const filter = (i) => {
      if (to.includes(i.user.id) && i.isSelectMenu()) {
        return true;
      }
      else {
        i.reply({ content: "This is Not For You!", ephemeral: true });
        return false;
      }
    }
    const collector = sent.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async function (interaction) {
      switch (interaction.customId) {
        case "selection":
          if (!interaction.isSelectMenu()) break;
          resolve(interaction.values[0])
          collector.stop();
          await sent.delete();
          break;
      }
    });
    collector.on('end', async function (_collected, reason) {
      if (reason == "user" || reason == "time") {
        if (reason == "time") {
          onTimeout(interaction);
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