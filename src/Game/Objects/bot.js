import { Player } from "./player.js";
export default class Bot extends Player {
  constructor(...data) {
    super(...data);
    this.isBot = true;
    this.id = Date.now().toString(16) + Math.random().toString(16);
    this.name = "Ludo Bot";
  }
  leave() {
    // Bots Don't Leave
  }
  async play() {
    return new Promise((resolve, reject) => {
      let times = [1000, 2000, 3000, 4000, 5000];
      let time = Math.floor(Math.random() * times.length);
      this.game.channel.sendTyping(time - 500);
      setTimeout(async () => {
        console.log(this.game.interaction)
        let num = await this.game.play();
        let components = this.game.message.components;
        components[0].components[1].setLabel(this.color.toUpperCase() + ": " + num.toString());
        let snapshot = await this.game.getSnapshot();
        this.game.interaction.editReply({ files: [snapshot], components });
        resolve(this.game.play());
      }, time)
    })
  }
  async prompt(choices) {
    return new Promise((resolve, reject) => {
      let times = [1000, 2000, 3000, 4000, 5000];
      let time = Math.floor(Math.random() * times.length);
      this.game.channel.sendTyping(time - 500);
      setTimeout(() => {
        resolve(choices[Math.floor(Math.random() * choices.length)]);
      }, time)
    });
  }
}