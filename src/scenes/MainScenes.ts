import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import KeyboardScene from "../utils/KeyboardScene";
import Physic from "../utils/Physic";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";

export default class MainScenes extends Scene {
  private core: Core;
  private physic: Physic;
  private terrain: Terrain;
  private player: Player;
  private keyboard: KeyboardScene;

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
    this.keyboard = new KeyboardScene(this);
  }

  create(): void {
    this.player.create();
    this.keyboard.create();
  }

  update(t: number, delta: number) {
    this.core.render();
    this.physic.update();
    this.terrain.update();
    this.player.update(delta);

    if (this.keyboard.w_pressed)
      this.player.body.velocity.z -= this.player.attributes.speed;

    if (this.keyboard.a_pressed)
      this.player.body.velocity.x -= this.player.attributes.speed;

    if (this.keyboard.s_pressed)
      this.player.body.velocity.z += this.player.attributes.speed;

    if (this.keyboard.d_pressed)
      this.player.body.velocity.x += this.player.attributes.speed;
  }
}
