import { Vec3 } from "cannon-es";
import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";

export default class MainScenes extends Scene {
  private core: Core;
  private terrain: Terrain;
  private player: Player;

  constructor() {
    super("MainScene");
    this.core = new Core();

    this.terrain = new Terrain({
      scene: this.core.scene,
      world: this.core.physicsController.world,
    });

    this.player = new Player({
      path: MODELS.dummy,
      scene: this.core.scene,
      world: this.core.physicsController.world,
      position: new Vec3(0, 1, 0),
    });
  }

  preload(): void {
    this.player.preload();
  }

  create() {
    let wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // W
    wKey.on("down", () => {
      this.player.walkUpOn(this.player.features.attrtibutes.movespeed);
    });
    wKey.on("up", () => {
      this.player.walkUpOff();
    });

    // A
    aKey.on("down", () => {
      this.player.walkLeftOn(this.player.features.attrtibutes.movespeed);
    });
    aKey.on("up", () => {
      this.player.walkLeftOff();
    });

    // S
    sKey.on("down", () => {
      this.player.walkDownOn(this.player.features.attrtibutes.movespeed);
    });
    sKey.on("up", () => {
      this.player.walkDownOff();
    });

    // D
    dKey.on("down", () => {
      this.player.walkRightOn(this.player.features.attrtibutes.movespeed);
    });
    dKey.on("up", () => {
      this.player.walkRightOff();
    });
  }

  update(t: number, delta: number) {
    this.core.update(delta);
    this.terrain.update(delta);
    this.player.update(delta);

    if (this.player.collisionBody)
      this.player.setText(
        `X: ${this.player.collisionBody.position.x.toFixed(
          2
        )} | y: ${this.player.collisionBody.position.y.toFixed(
          2
        )} | z: ${this.player.collisionBody.position.z.toFixed(2)}`
      );

    // if (this.actors.length > 0)
    //   this.actors.forEach((actor) => actor.update(delta));
  }
}
