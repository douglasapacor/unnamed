import * as CANNON from "cannon-es";
import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Enemy from "../utils/Enemy";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";

export default class MainScenes extends Scene {
  private core: Core = new Core();
  private terrain: Terrain;
  private player: Player;
  private actors: any[] = [];

  constructor() {
    super("MainScene");
  }

  preload(): void {
    this.terrain = new Terrain({
      scene: this.core.scene,
      world: this.core.physicsController.world,
    });

    this.player = new Player({
      path: MODELS.dummy,
      scene: this.core.scene,
      world: this.core.physicsController.world,
      position: new CANNON.Vec3(14, 1, 14),
    });

    this.actors.push(
      new Enemy({
        path: MODELS.enemy,
        scene: this.core.scene,
        world: this.core.physicsController.world,
        position: new CANNON.Vec3(2, 3, 2),
        name: "enemy",
      })
    );
  }

  create() {
    let w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // W key
    w.on("down", () => {
      this.player.walkUpOn(this.player.attributes.speed);
    });
    w.on("up", () => {
      this.player.walkUpOff();
    });

    // A key
    a.on("down", () => {
      this.player.walkLeftOn(this.player.attributes.speed);
    });
    a.on("up", () => {
      this.player.walkLeftOff();
    });

    // S key
    s.on("down", () => {
      this.player.walkDownOn(this.player.attributes.speed);
    });
    s.on("up", () => {
      this.player.walkDownOff();
    });

    // D key
    d.on("down", () => {
      this.player.walkRightOn(this.player.attributes.speed);
    });
    d.on("up", () => {
      this.player.walkRightOff();
    });
  }

  update(t: number, delta: number) {
    this.core.update(delta);
    this.terrain.update(delta);
    this.player.update(delta);

    if (this.actors.length > 0)
      this.actors.forEach((actor) => actor.update(delta));
  }
}
