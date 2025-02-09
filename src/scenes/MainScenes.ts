import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";
import Enemy from "../utils/Enemy";

export default class MainScenes extends Scene {
  private core: Core;
  private terrain: Terrain;
  private player: Player;
  private enemy: Enemy;

  constructor() {
    super("MainScene");
    this.core = new Core();
  }

  preload(): void {
    this.core.preload();
    this.terrain = new Terrain(this.core.scene, this.core.physics.world);
    this.player = new Player({
      path: MODELS.dummy,
      input: this.input,
      scene: this.core.scene,
      world: this.core.physics.world,
      showBoxCollider: true,
    });
    this.enemy = new Enemy({
      path: MODELS.enemy,
      scene: this.core.scene,
      world: this.core.physics.world,
      showBoxCollider: true,
    });
  }

  create(): void {
    this.player.create();
    this.enemy.create();
  }

  update(t: number, delta: number) {
    this.core.update(delta);
    this.terrain.update(delta);
    this.player.update(delta);
    this.enemy.update(delta);
  }
}
