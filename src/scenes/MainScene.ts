import { Vec3 } from "cannon-es";
import { Vector3 } from "three";
import { dummy } from "../directories";
import ActorManager from "../lib/ActorManager";
import { Fireball } from "../lib/Fireball";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";
import { PlayerHUD } from "../GUI/PlayerHUD";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;
  private actorManager!: ActorManager;
  private playerhud!: PlayerHUD;

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
    this.playerhud = new PlayerHUD();
    this.player.preload();
  }

  public override create(): void {
    new InputController(this.player);
  }

  public override update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
    this.actorManager.update(delta);
    if (this.player.body) {
    }
  }
}
