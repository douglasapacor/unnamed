import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Physic from "../utils/Physic";
import Terrain from "../utils/Terrain";
import Player from "../utils/Player";

export default class MainScenes extends Scene {
  private core: Core;
  private physic: Physic;
  private terrain: Terrain;
  private player: Player;
  private W_key: Phaser.Input.Keyboard.Key;
  private A_key: Phaser.Input.Keyboard.Key;
  private S_key: Phaser.Input.Keyboard.Key;
  private D_key: Phaser.Input.Keyboard.Key;

  constructor() {
    super("MainScene");
    this.core = new Core();
  }

  preload(): void {
    this.core.init();
    this.physic = new Physic();
    this.terrain = new Terrain(this.core._scene, this.physic._world);
    this.player = new Player(
      this.core._scene,
      this.physic._world,
      MODELS.dummy,
      1
    );
  }

  create(): void {
    this.player.create();

    this.W_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.W_key.on("down", () => {});

    this.A_key.on("down", () => {});

    this.S_key.on("down", () => {});

    this.D_key.on("down", () => {});
  }

  update(t: number, delta: number) {
    this.core.render();
    this.physic.update();
    this.terrain.update();
    this.player.update(delta);
  }
}
