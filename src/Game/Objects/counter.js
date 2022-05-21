import { colors, counters } from "../lib/consts.js";
export class Counter {
  constructor(color, x, y, metadata) {
    this.color = colors[color];
    this._x = x;
    this._y = y;
    this.type = metadata.type;
    this.parentData = metadata.parentData;
    this.radius = metadata.r || 20;
    this.game = metadata.game;
    this.ctx = this.game.ctx
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.stopData = counters[this.color]
  }
  draw(n = 0) {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = "#BEBEBE";
    this.ctx.lineWidth = 3;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill()
    this.ctx.stroke();

    this.ctx.font = "700 20px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    this.ctx.fillStyle = "#FFFFFF";

    if (this.color == "#FFE800") this.ctx.fillStyle = "#4D4D4D";

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(n, this.x, this.y);
  }

  updateCount(n = 0) {
    this.draw(n);
  }

  get x() {
    return (40 + (this._x - 1) * 80);
  }
  get y() {
    return (40 + (this._y - 1) * 80);
  }
}