import { homes, paths, starts, stops } from "../lib/consts.js";

export class Token {
  constructor(imgData, x, y, metadata) {
    let splited = new URL(imgData.src).pathname.split(/[\/|\\]/gm).at(-1).split(".");
    this.color = splited[0];
    this.tag = splited[1];
    this.game = metadata.game;
    this.ctx = this.game.ctx;
    this.player = metadata.player;
    this.imgData = imgData;
    this.width = 60;
    this.height = 60;
    this.objectId = Date.now().toString(16) + Math.random().toString(16);
    this._x = x;
    this._y = y;
    this._px = x;
    this._py = y;
    this.index = 0;
  }
  draw(drawTilted) {
    if (drawTilted) {
      this.ctx.drawImage(this.imgData, this.px, this.py, this.width, this.height);
    }
    else {
      this.ctx.drawImage(this.imgData, this.x, this.y, this.width, this.height);
    }
  }

  tilt(factorX = 0, factorY = 0) {
    this._px = this._x + factorX;
    this._py = this._y + factorY;
  }

  move(direction, magnitude) {
    Number.isInteger(this._x - 1) && Number.isInteger(this._y - 1) && this.game.gameMap[this._x - 1][this._y - 1] ? this.game.gameMap[this._x - 1][this._y - 1] = this.game.gameMap[this._x - 1][this._y - 1].filter(obj => obj.objectId !== this.objectId) : null;

    const l = () => {
      this.game.gameMap[this._x - 1][this._y - 1].push(this);
      this.game.resetFrame();
      let toGoTo = this.game.gameMap[this._x - 1][this._y - 1].filter(obj => obj.objectId !== this.objectId);
      let restPlaces = [...Object.values(starts), ...Object.values(stops)];
      if (toGoTo.length > 0) {
        toGoTo.forEach(token => {
          if (token.color != this.color && !restPlaces.some(p => p[0] == token._x && p[1] == token._y)) {
            console.log("tok", toGoTo)
            token.returnHome();
          }
        });
      }
    }
    switch (direction) {
      case -1:
        this._x = starts[this.color][0];
        this._y = starts[this.color][1];
        delete this.player.home[this.tag];
        l();
        break;
      case 0:
        this._y -= magnitude;
        l();
        break;
      case 1:
        this._y += magnitude;
        l();
        break;
      case 2:
        this._x -= magnitude;
        l();
        break;
      case 3:
        this._x += magnitude;
        l();
        break;
      case 4:
        this._x -= magnitude;
        this._y -= magnitude;
        l();
        break;
      case 5:
        this._x += magnitude;
        this._y -= magnitude;
        l();
        break;
      case 6:
        this._x -= magnitude;
        this._y += magnitude;
        l();
        break;
      case 7:
        this._x += magnitude;
        this._y += magnitude;
        l();
        break;
      case 42:
        if (this.color == "red") this._y -= magnitude;
        if (this.color == "blue") this._x -= magnitude;
        if (this.color == "green") this._x += magnitude;
        if (this.color == "yellow") this._y += magnitude;
        console.log("win");
        this.player.choices = this.player.choices.filter(choice => choice.objectId !== this.objectId);
        delete this.player.home[this.tag];
        this.player.goals += 1;
        l();
        break;
      default:
        break;
    }
  }
  walk(magnitude) {
    let directions;
    if (paths[this.color].length < this.index + magnitude) return;
    if (this.index == 0) {
      if (magnitude !== 6) return;
      this.player.choices.push(this);
      directions = paths[this.color].slice(this.index, this.index + 1);
      this.index += 1;
    }
    else {
      directions = paths[this.color].slice(this.index, this.index + magnitude);
      this.index += magnitude;
      magnitude = 1;
    }
    directions.forEach(p => {
      this.move(p, magnitude);
    });
  }

  returnHome() {
    this._x = homes[this.color][this.tag][0];
    this._y = homes[this.color][this.tag][1];
    this.player.choices = this.player.choices.filter(choice => choice.objectId !== this.objectId);
    this.player.home[this.tag] = this;
    this.index = 0;
    this.game.resetFrame();
  }

  get x() {
    return (40 + (this._x - 1) * 80) - this.width / 2;
  }
  get y() {
    return (40 + (this._y - 1) * 80) - this.height / 2;
  }

  get px() {
    return (40 + (this._px - 1) * 80) - this.width / 2;
  }
  get py() {
    return (40 + (this._py - 1) * 80) - this.height / 2;
  }
}