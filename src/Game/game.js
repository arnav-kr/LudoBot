import { Player } from "./Objects/player.js";
import { counters, paths, starts, stops, winCoords } from "./lib/consts.js";
import { Counter } from "./Objects/counter.js";
import Bot from "./Objects/bot.js";
import { getUnique4 } from "./lib/utils.js";
import PlayerName from "./Objects/playerName.js";
export class Game {
  constructor(ctx, {
    color,
    players,
    assets,
    client,
    channel,
    canvas,
    prompt,
  }) {
    this.winner = null;
    this.ctx = ctx;
    this.canvas = canvas;
    this.client = client;
    this.channel = channel;
    this.assets = assets;
    this.prompt = prompt;
    this.players = {};
    this.currentPlayer = color;
    this.playerData = players;
    this.gameMap = [...Array(15)].map(i => [...Array(15)].map(() => []));
    this.counters = { red: [], blue: [], green: [], yellow: [] };
    this.currentPlayerIndex = 0;
    this.leftUsers = [];
    this.events = {
      playerChange: () => { },
    }
    if (players.length == 1) throw new RangeError("You Can't Play Alone!")
    if (players.length == 2) {
      let clrPairs = [
        ["red", "yellow"],
        ["blue", "green"],
      ];
      this.playerData[0].color = color;
      this.playerData[1].color = clrPairs[0].includes(color) ? clrPairs[0].filter(c => c != color)[0] : clrPairs[1].filter(c => c != color)[0];
    }
    else if (players.length == 4) {
      let clrs = ["red", "blue", "yellow", "green"];
      this.playerData[0].color = color;
      clrs = clrs.filter(c => c != color);
      clrs.forEach((c, i) => { this.playerData[i + 1].color = c; })
    }
    else throw new RangeError("Only 2 or 4 users can play at a time!")
    this.currentPlayer = this.playerData[this.currentPlayerIndex].color;
    this.setup();
  }
  async play(interaction = undefined) {
    if (Object.keys(this.players).length <= 1) return;
    let player = this.players[this.currentPlayer];
    let magnitude = player.roll();
    let choices = [];
    Object.values(player.tokens).forEach(token => {
      if (player.home[token.tag]) {
        if (magnitude == 6) {
          choices.push(token);
        }
      }
      else if (token.index + magnitude <= paths[token.color].length) {
        choices.push(token);
      }
    });
    console.log(this.currentPlayer, "mag:", magnitude);
    if (Object.keys(player.home).length == 4) {
      if (magnitude == 6) {
        player.home[Object.keys(player.home)[0]].walk(magnitude);
      }
      else {

      }
    }
    else {
      if (choices.length == 0) { }
      else if (choices.length == 1) {
        player.tokens[choices[0].tag].walk(magnitude);
      }
      else {
        const choice = await player.prompt(choices.map(t => t.tag), interaction);
        if (choice && ["a", "b", "c", "d"].includes(choice)) {
          choices.filter(t => t.tag == choice)[0].walk(magnitude);
        }
      }
    }
    if (magnitude != 6) {
      this.currentPlayerIndex += 1;
      if (this.currentPlayerIndex >= this.playerData.length) this.currentPlayerIndex = 0;
      this.currentPlayer = this.playerData[this.currentPlayerIndex].color;
      if (this.players[this.currentPlayer].isBot) await this.players[this.currentPlayer].play();
      this.events.playerChange(this.currentPlayer);
    }
    return magnitude;
  }
  skip() {
    if (Object.keys(this.players).length <= 1) return;
    this.players[this.currentPlayer].skippedChances += 1;
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex >= this.playerData.length) this.currentPlayerIndex = 0;
    this.currentPlayer = this.playerData[this.currentPlayerIndex].color;
    this.events.playerChange(this.currentPlayer);
  }
  setup() {
    this.ctx.drawImage(this.assets.board, 0, 0, this.canvas.width, this.canvas.height);

    Object.entries(counters).forEach(([k, v]) => {
      v.forEach((c, i) => {
        this.counters[k][i] = new Counter(k, c[0], c[1], {
          game: this,
          type: i == 0 ? "start" : "stop",
          parentData: i == 0 ? starts[k] : stops[k],
        })
        this.counters[k][i].draw(0);
      })
    });
    this.playerData.forEach(player => {
      this.players[player.color] = new Player(this.ctx, player.color, {
        id: player.id,
        game: this,
      });
      this.players[player.color].nameObj = new PlayerName({
        color: player.color,
        name: player.name,
        game: this,
        ctx: this.ctx,
      })
      this.players[player.color].nameObj.draw();
    });
    this.events.playerChange(this.currentPlayer);
    this.key = "R5eb7_1XiwsTbQeOICGhBdey2icOX6Jwx0tSlOIuEXp6E5UwG8xpSEi3tRATLlpIQAl8w2j1TGqLPaPhFcas0kecbqdLWgyk_Bu3TyPdg-XC5M-MWVJsFWlXeaBszik2RC8ctEUS6SJFXivOo8yBjQ31kiPwux-zcXzkVUVft_SlAyrTmp8Kyj_-XfF5WsBJrrsZZk-hlJ-dpNRjWoZWhKoT3d54eZ2zx3B6mTb7VWw";
  }
  resetFrame() {
    Object.entries(this.players).forEach(([k, v]) => {
      if (v.goals == 4) {
        this.winner = k;
        this.resetFrame = () => { };
        this.play = () => { };
      }
    });
    this.ctx.drawImage(this.assets.board, 0, 0, this.canvas.width, this.canvas.height);

    Object.entries(this.counters).forEach(([k, v]) => {
      v.forEach((c, i) => {
        c.draw(0);
      })
    });

    Object.values(this.players).forEach(p => {
      Object.values(p.tokens).forEach(t => t.draw());
      p.nameObj.draw();
    });

    let winPos = Object.entries(winCoords);
    winPos.forEach(([clr, [x, y]]) => {
      let tokns = this.gameMap[x - 1][y - 1];
      let shifts = [
        [
          [0.2, 0],
          [-0.2, 0],
          [0.1, 0],
          [-0.1, 0],
        ],
        [
          [0, 0.2],
          [0, -0.2],
          [0, 0.1],
          [0, -0.1],
        ]
      ];
      if (["red", "yellow"].includes(clr)) {
        shifts = shifts[0];
      }
      else if (["blue", "green"].includes(clr)) {
        shifts = shifts[1];
      }
      if (tokns.length > 1) {
        tokns.forEach((t, i) => {
          t.tilt(...shifts[i]);
          t.draw(true);
        })
      }
      else {
        tokns.forEach(t => {
          t.draw();
        })
      }
    });

    let restPlaces = [...Object.values(starts), ...Object.values(stops)];
    restPlaces.forEach(([x, y]) => {
      let tokns = this.gameMap[x - 1][y - 1];

      let countr = Object.values(this.counters).map(a => [a[0], a[1]]).reduce((a, b) => a.concat(b)).filter(d => d.parentData[0] == x && d.parentData[1] == y);
      countr[0].updateCount(tokns.length);

      let shifts = [
        [-0.075, 0],
        [0.075, 0],
        [0, -0.075],
        [0, 0.075],
      ];
      if (tokns.length > 4) tokns = getUnique4(tokns);
      if (tokns.length > 1) {
        tokns.forEach((t, i) => {
          t.tilt(...shifts[i]);
          t.draw(true);
        });
      }
    });
  }

  on(event, callback) {
    this.events[event] = callback;
  }
  async getSnapshot() {
    return await this.canvas.toBuffer("png");
  }
}