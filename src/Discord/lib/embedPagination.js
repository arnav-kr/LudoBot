import { MessageActionRow, MessageButton, MessageSelectMenu, Message, CommandInteraction } from "discord.js";
/**
 * A Embeds Pagination For message
 * @param: message object
 * @param: array of embeds
 * @param: an array of string with pageNames
 * @param: TimeLimit in ms [Default 120000]
 */
export const MessageEmbedsPagination = async ({ msg, botMsg, embeds, pageNames, ephemeral = false, time, deferred = false } = {}) => {
  const navigation = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("first")
        .setEmoji("⏪")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("previous")
        .setEmoji("◀️")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("next")
        .setEmoji("▶️")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("last")
        .setEmoji("⏩")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("stop")
        .setEmoji("⏹️")
        .setStyle("DANGER"),
    );
  let type = null;

  // Make selection if Showmenu is true

  let selction = new MessageSelectMenu()
    .setCustomId('selection')
    .setPlaceholder('Make a Selection');

  pageNames.forEach((category, index) => {
    selction.addOptions([
      {
        label: `Page ${index + 1}`,
        description: category,
        value: (index + 1).toString()
      },
    ])
  });

  let menu = new MessageActionRow()
    .addComponents(selction);


  let currentPage = 0;

  if (embeds.length == 0) return;

  let totalPages = embeds.length;

  let message;
  if (msg instanceof Message) {
    type = 'message';
    if (deferred) {
      message = await botMsg.edit({ content: "‍", embeds: [addPageNumber(embeds[0], currentPage, totalPages)], components: [navigation, menu] });
    }
    else {
      message = await msg.channel.send({ embeds: [addPageNumber(embeds[0], currentPage, totalPages)], components: [navigation, menu] });
    }
  }
  else if (msg instanceof CommandInteraction) {
    type = 'command';
    if (deferred) {
      message = await msg.editReply({ content: "‍", embeds: [addPageNumber(embeds[0], currentPage, totalPages)], components: [navigation, menu], ephemeral: ephemeral });
    }
    else {
      message = await msg.reply({ embeds: [addPageNumber(embeds[0], currentPage, totalPages)], components: [navigation, menu], fetchReply: true, ephemeral: ephemeral });
    }
  }
  const filter = (i) => i.user.id == (msg?.author?.id || msg.user.id) && (i.isSelectMenu() || i.isButton());
  const collector = message.createMessageComponentCollector({ filter, time });

  collector.on('collect', async function (interaction) {
    switch (interaction.customId) {
      case "first":
        currentPage = 0;
        break;
      case "previous":
        currentPage == 0 ? currentPage = 0 : currentPage--;
        break;
      case "next":
        currentPage == embeds.length - 1 ? currentPage = embeds.length - 1 : currentPage++;
        break;
      case "last":
        currentPage = embeds.length - 1;
        break;
      case "selection":
        if (!interaction.isSelectMenu()) break;
        currentPage = +interaction.values[0] - 1;
        break;
      case "stop":
        collector.stop()
        break;
    }

    if (interaction.customId == 'stop')
      await interaction.update({ embeds: [addPageNumber(embeds[currentPage], currentPage, totalPages)], components: [] })
    else
      await interaction.update({ embeds: [addPageNumber(embeds[currentPage], currentPage, totalPages)] });

  });
  collector.on('end', async function (_collected, reason) {
    if (reason == "user" || reason == "time") { } else {
      new Error(reason);
    }
    await message.edit({ embeds: [addPageNumber(embeds[currentPage], currentPage, totalPages)], components: [] });
  });
}

function addPageNumber(embed, currentPage, totalPages) {
  embed.setFooter({ text: `${currentPage + 1}/${totalPages}` });
  return embed;
}