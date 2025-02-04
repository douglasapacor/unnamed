import { Scene } from "phaser";
import Core from "../utils/Core";
import Entity from "../utils/Entity";
import Physic from "../utils/Physic";
import Terrain from "../utils/Terrain";
import { MODELS } from "../config/directories";

export default class MainScenes extends Scene {
  private core: Core;
  private physic: Physic;
  private terrain: Terrain;
  private char: Entity;

  constructor() {
    super("MainScene");
    this.core = new Core();
  }

  preload(): void {
    this.core.init();
    this.physic = new Physic();
    this.terrain = new Terrain(this.core._scene, this.physic._world);
    this.char = new Entity(
      this.core._scene,
      this.physic._world,
      MODELS.dummy,
      1
    );
  }

  create(): void {
    this.char.create();
  }

  update(t: number, delta: number) {
    this.core.render();
    this.physic.update();
    this.terrain.update();
    this.char.update(delta);
  }
}
