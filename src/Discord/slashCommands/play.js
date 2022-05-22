import { MessageActionRow, MessageButton } from "discord.js";
import { Canvas } from "skia-canvas";
import { Game } from "../../Game/game.js";
import { confirm, prompt } from "../lib/inputs.js";
export const command = {
  name: 'play',
  description: 'Play LUDO!',
  options: [
    {
      name: 'player2',
      description: '2nd Player',
      type: 'USER',
      required: true,
    },
    {
      name: 'player3',
      description: '3rd Player',
      type: 'USER',
      required: false,
    },
    {
      name: 'player4',
      description: '4th Player',
      type: 'USER',
      required: false,
    },
  ],

  async run({ interaction }) {
    let player2 = interaction.options.getUser('player2') ?? null;
    let player3 = interaction.options.getUser('player3') ?? null;
    let player4 = interaction.options.getUser('player4') ?? null;

    let players = [player2, player3, player4].filter(i => i != null);
    if (players.length == 0) return interaction.reply({ content: "You can't Play Alone!", ephemeral: true });
    if (players.length == 2) return interaction.reply({ content: "Only 2 or 4 players can play at a time (including you)", ephemeral: true });
    if (players.some(i => i.id == interaction.user.id)) return interaction.reply({ content: "You can't invite yourself!", ephemeral: true });
    if (players.some(u => u.bot)) return interaction.reply({ content: "You can't invite Discord Bots for a game!", ephemeral: true });
    if (Array.from(new Set(players.map(p => p.id))).length !== players.length) return interaction.reply({ content: "You can't invite a User multiple times!", ephemeral: true });

    let members = players.map(async (p) => await (interaction.guild.members.cache.get(p.id) || interaction.guild.members.cache.get(p.id)));
    members.push(interaction.member);

    if (members.some(m => m.isEngazed == true)) {
      let memberArr = members.map(m => `<@${m.id}>`);
      interaction.reply(`${memberArr.length > 1 ? memberArr.join(", ") + "are " : memberArr.join(", ") + "is "} busy in their own works. Please Invite someone else.`)
    }


    try {
      await interaction.reply({ content: `Getting Things Ready For You...`, fetchReply: true, ephemeral: true });
    } catch (e) { }

    let UserActions = [];
    members.forEach(m => m.isEngazed = true);
    if (players.length > 0) {
      UserActions = await confirm({
        channel: interaction.channel,
        to: players.map(p => p.id),
        content: `<@${interaction.user.id}> invited ${players.map(u => `<@${u.id}>`).join(", ")} to play a Ludo Match!\n\n*Do you want to play?*`,
      });
    }

    players.unshift(interaction.user);

    Object.entries(UserActions).forEach(([id, play]) => {
      if (!play) {
        members.filter(m => m.id = id)[0].isEngazed = false;
        players = players.filter(p => p.id != id);
      }
    });
    console.log(players)

    if (players.length == 1) return interaction.channel.send({ content: "You can't Play Alone!", ephemeral: true });
    if (players.length == 3) return interaction.channel.send({ content: "Only 2 or 4 players can play at a time (including you)", ephemeral: true });

    let playerData = [];
    players.forEach(player => {
      playerData.push({
        id: player.id,
        name: player.username,
        isBot: player.bot
      });
    });

    let color = await prompt({
      defaultValue: "red",
      channel: interaction.channel,
      to: [interaction.user.id],
      content: `<@${interaction.user.id}> Choose a Token Color For Yourself!`,
      placeholder: "Choose a Token Color",
      ephemeral: true,
      choices: [
        {
          label: '🟥 Red',
          value: 'red',
        },
        {
          label: '🟦 Blue',
          value: 'blue',
        },
        {
          label: '🟩 Green',
          value: 'green',
        },
        {
          label: '🟨 Yellow',
          value: 'yellow',
        },
      ],
    });

    let canvas = new Canvas(1200, 1200);
    let ctx = canvas.getContext("2d");
    await interaction.channel.send(`You are ${color}!`);

    let clrEmojis = {
      red: "🔴",
      blue: "🔵",
      green: "🟢",
      yellow: "🟡",
    }

    let game = new Game(ctx, {
      prompt: prompt,
      canvas: canvas,
      color: color,
      assets: interaction.client.assets,
      players: playerData,
      client: interaction.client,
      channel: interaction.channel,
    });

    async function gameLoop(count) {

      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("roll")
            .setLabel("Roll")
            .setStyle("PRIMARY"),

          new MessageButton()
            .setCustomId("currentNumber")
            .setLabel(count.toString())
            .setStyle("SECONDARY")
            .setDisabled(true),

          new MessageButton()
            .setCustomId("leave")
            .setLabel("Leave")
            .setStyle("DANGER"),
        );

      let snapshot = await game.getSnapshot();
      let gameMsg = await interaction.channel.send({
        content: `<@${Object.values(game.players).filter(p => p.color == game.currentPlayer)[0].id}>(\\${clrEmojis[game.currentPlayer]})'s Turn!`,
        files: [snapshot],
        components: [buttons],
      });
      game.message = gameMsg;
      game.interaction = interaction;

      const filter = (i) => players.map(p => p.id).includes(i.user.id) && i.isButton();
      const collector = gameMsg.createMessageComponentCollector({ filter, time: 90 * 60 * 1000 });

      collector.on('collect', async function (interaction) {
        switch (interaction.customId) {
          case "roll":
            let cp = game.currentPlayer;
            if (interaction.user.id != game.players[cp].id) return interaction.reply({ content: "Its Not Your Turn!", ephemeral: true });
            await game.play(interaction);
            await gameMsg.delete();
            if (!game.winner) {
              await gameLoop(cp.toUpperCase() + ": " + game.players[cp].currentNumber);
            }
            else {
              interaction.channel.send(`${game.players[game.winner]} won the Game! 🎉`);
            }
            break;
          case "leave":
            let leave = await confirm({
              interaction: interaction,
              channel: interaction.channel,
              to: [interaction.user.id],
              content: `<@${interaction.user.id}> Are you sure you want to leave?`,
            })
            leave = leave[interaction.user.id];
            if (leave) {
              Object.values(game.players).filter(u => u.id == interaction.user.id)[0].leave()
              await interaction.channel.send(`<@${interaction.user.id}> shamelessly left the game!`);
              members.filter(m => m.id == interaction.user.id)[0].isEngazed = false;
            }
            if (Object.keys(game.players).length - game.leftUsers.length <= 1) {
              collector.stop();
              await gameMsg.delete();
              members.forEach(member => member.isEngazed = false);
              return interaction.channel.send(`Everyone Left! So, Ending the Game.`);
            }
            break;
        }
      });
      collector.on('end', async function (_collected, reason) {
        if (reason == "user" || reason == "time") {
          if (reason == "time") {
            Game.skip();
          }
        } else {
          console.error(reason);
        }
      });
    }
    await gameLoop(0);
  }
}