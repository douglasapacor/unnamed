import { Vec3 } from "cannon-es";
import { Scene } from "phaser";
import { Vector3 } from "three";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";

export default class MainScenes extends Scene {
  private core: Core;
  private terrain: Terrain;
  private player: Player;
  private playerText: Phaser.GameObjects.Text;

  constructor() {
    super("MainScene");
    this.core = new Core();

    this.player = new Player({
      path: MODELS.dummy,
      scene: this.core.scene,
      world: this.core.physicsController.world,
      position: new Vec3(0, 0, 0),
    });
  }

  preload(): void {
    this.player.preload();
  }

  create() {
    this.playerText = this.add
      .text(0, 0, "Jogador", {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 5, y: 2 },
      })
      .setOrigin(0.5, 1)
      .setDepth(1000);

    this.terrain = new Terrain({
      scene: this.core.scene,
      world: this.core.physicsController.world,
    });

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

    if (this.player.collisionBody) {
      const playerScreenPos = this.core.cameraController.toScreenPosition(
        new Vector3(
          this.player.collisionBody.position.x,
          this.player.collisionBody.position.y,
          this.player.collisionBody.position.z
        )
      );

      this.playerText.setPosition(playerScreenPos.x, playerScreenPos.y - 50);
    }

    // if (this.actors.length > 0)
    //   this.actors.forEach((actor) => actor.update(delta));
  }
}
