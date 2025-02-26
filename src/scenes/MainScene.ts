import { Vec3 } from "cannon-es";
import { ExempleOne } from "../actors/ExempleOne";
import { dummy, enemy } from "../directories";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;

  public override preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
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

    this.actors.push(
      new ExempleOne({
        model: enemy,
        name: "inimigo",
        scene: this.scene,
        world: this.world,
        position: new Vec3(10, -3, 10),
      })
    );
  }

  public override update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);

    this.actors.forEach((actor) => {
      actor.update(this.player, delta);
    });
  }
}
