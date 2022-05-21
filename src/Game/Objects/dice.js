export default class Dice {
  constructor(n = 6) {
    this.n = n;
  }
  roll() {
    return Math.floor(Math.random() * this.n + 1)
  }
}