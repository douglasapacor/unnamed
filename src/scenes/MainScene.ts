import { Vec3 } from "cannon-es";
import { Vector3 } from "three";
import { dummy } from "../directories";
import ActorManager from "../lib/ActorManager";
import { Fireball } from "../lib/Fireball";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;
  private actorManager!: ActorManager;
  private fire!: Fireball;

  public override preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.actorManager = new ActorManager();
    this.player = new Player({
      name: "player",
      model: dummy,
      scene: this.scene,
      world: this.world,
      position: new Vec3(0, -3, 0),
    });
    this.player.preload();
  }

  public override create(): void {
    new InputController(this.player);
    this.fire = new Fireball({ scene: this.scene, world: this.world });
  }

  public override update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
    this.actorManager.update(delta);
    this.fire.update();
    if (this.player.body) {
      this.fire.chase(
        new Vector3(
          this.player.body.position.x,
          this.player.body.position.y,
          this.player.body.position.z
        )
      );
    }
  }
}
