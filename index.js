import assets from "./src/Game/lib/assets.js";
import { Game } from "./src/Game/game.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let TokenData = { red: {}, blue: {}, green: {}, yellow: {} };
let CounterData = { red: [], blue: [], green: [], yellow: [] };
; (async () => {
  const game = new Game(ctx, {
    assets: await assets,
    color: "red",
    players: [{
      id: "13243253535",
      name: "Alpha"
    },
    {
      id: "13243257535",
      name: "Beta"
    },
    {
      id: "14243257535",
      name: "Gamma",
    },
    {
      id: "13263257535",
      name: "Delta",
    },
    ]
  })
  game.Discord = {
    async prompt({ id, color, choices }) {
      return new Promise((resolve, reject) => {
        resolve(prompt(color + ": " + choices.join(", or ")))
      });
    }
  }
  game.on("playerChange", player => {
    document.getElementById("player").innerText = player;
  })
  window.game = game;
})();

; (async () => {
  // Drawing Stuff
  // const asset = await assets;
  // ctx.drawImage(asset.board, 0, 0, canvas.width, canvas.height);
  // Object.keys(homes).forEach(color => {
  //   Object.entries(homes[color]).forEach(([k, v]) => {
  //     TokenData[color][k] = new Token(asset[color + "_" + k], ...v);
  //     TokenData[color][k].draw(ctx)
  //   });
  // });
  // Object.entries(counters).forEach(([k, v]) => {
  //   v.forEach((c, i) => {
  //     CounterData[k][i] = new Counter(k, c[0], c[1])
  //     CounterData[k][i].draw(ctx, 0);
  //   })
  // });
  // CounterData.red[0].updateCount(ctx, 16);

  // let tr = new Token(asset.red_a, 7, 14);
  // let tb = new Token(asset.blue_a, 14, 19);
  // let tg = new Token(asset.green_a, 2, 7);
  // let ty = new Token(asset.yellow_b, 9, 2);
  // tr.draw(ctx);
  // tb.draw(ctx);
  // tg.draw(ctx);
  // ty.draw(ctx);
  // let i = 0;
  // let interval = setInterval(() => {
  //   tr.move(ctx, paths.red[i], 1);
  //   tb.move(ctx, paths.blue[i], 1);
  //   tg.move(ctx, paths.green[i], 1);
  //   ty.move(ctx, paths.yellow[i], 1);

  //   tr.draw(ctx);
  //   tb.draw(ctx);
  //   tg.draw(ctx);
  //   ty.draw(ctx);
  //   i++;
  //   if (i === paths.yellow.length) {
  //     clearInterval(interval);
  //   }
  // }, 100);

})();