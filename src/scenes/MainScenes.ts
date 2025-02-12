import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";
import Controllers from "../utils/Controllers";

export default class MainScenes extends Scene {
  private core: Core = new Core();
  private terrain: Terrain;
  private player: Player;
  private controllers: Controllers;

  constructor() {
    super("MainScene");
    this.controllers = new Controllers(this.input);
  }

  preload(): void {
    this.terrain = new Terrain({
      scene: this.core.scene,
      world: this.core.physics.world,
    });

    this.player = new Player({
      path: MODELS.dummy,
      scene: this.core.scene,
      world: this.core.physics.world,
    });
  }

  update(t: number, delta: number) {
    this.core.update(delta);
    this.terrain.update(delta);
    this.player.update(delta);
  }
}
