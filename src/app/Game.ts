import MainScenes from "../scenes/MainScenes";

export default class Game {
  private phaserGame!: Phaser.Game;

  constructor(parentElementId: string) {
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: parentElementId,
      backgroundColor: "#222",
      scene: [MainScenes],
      physics: {
        default: "arcade",
        arcade: { debug: true },
      },
    });
  }
}
