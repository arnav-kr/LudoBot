import { playerNameCoords } from "../lib/consts.js";

export default class PlayerName {
  constructor(options) {
    this.name = options.name || "Player";
    this.name = this.name.length > 20 ? this.name.substring(0, 17) + "..." : this.name;
    this.color = options.color;
    this.ctx = options.ctx;
  }
  draw() {
    this.ctx.fillStyle = "#ffffff";
    if (this.color == "yellow") this.ctx.fillStyle = "#4d4d4d";
    this.ctx.font = "500 32px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = "center";
    let rectBounds = this.ctx.measureText(this.name);
    this.width = Math.ceil(rectBounds.width) + 20;
    this.height = 36;
    this._x = playerNameCoords[this.color][0];
    this._y = playerNameCoords[this.color][1];
    this.ctx.fillText(this.name, this.x, this.y);
  }
  get x() {
    return (40 + (this._x - 1) * 80);
  }
  get y() {
    return (40 + (this._y - 1) * 80) - this.height / 2;
  }
}