import Dice from "./dice.js"
import { homes } from "../lib/consts.js";
import { Token } from "./token.js";
export class Player {
  constructor(ctx, color, metadata) {
    this.color = color;
    this.dice = new Dice(6);
    this.tokens = {};
    this.id = metadata.id;
    this.game = metadata.game;
    this.assets = this.game.assets;
    this.currentNumber = null;
    this.goals = 0;
    this.choices = [];
    Object.entries(homes[this.color]).forEach(([k, v]) => {
      this.tokens[k] = new Token(this.assets[`${this.color}_${k}`], ...v, {
        game: this.game,
        player: this,
      });
      this.tokens[k].draw(ctx)
    });
    this.home = { ...this.tokens };
  }
  roll() {
    let num = this.dice.roll();
    this.currentNumber = num;
    return num;
  }
  leave() {
    this.left = true;
    this.game.playerData.filter(p => p.id != this.id);
    this.nameObj.name = this.nameObj.name.length > 11 ? this.nameObj.name.substr(0, 11) + "...(left)" : this.nameObj.name + "(left)";
  }
  async prompt(choices, interaction) {
    let choiceObj = choices.map((c) => {
      let vals = {
        red: "🔴",
        blue: "🔵",
        green: "🟢",
        yellow: "🟡",
      }
      return {
        label: `${vals[this.color]} ${c.toUpperCase()}`,
        value: c,
      };
    });
    return await this.game.prompt({
      interaction: interaction,
      content: `<@${this.id}> Choose a Token to move:`,
      placeholder: "Choose a Token",
      choices: choiceObj,
      to: this.id,
      channel: this.game.channel,
    });
  }
}