import configs from "./config";

export default class Game {
  protected game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(configs);
  }
}
