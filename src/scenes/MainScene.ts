import { Vec3 } from "cannon-es";
import { ExempleOne } from "../actors/ExempleOne";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;
  private input!: InputController;

  public preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.player = new Player({
      name: "player",
      model: "dummy",
      scene: this.scene,
      world: this.world,
      position: new Vec3(0, -3, 0),
    });
    this.player.preload();
    this.input = new InputController(this.player);
    this.addActor(
      new ExempleOne({
        modelname: "enemy",
        name: "inimigo",
        scene: this.scene,
        world: this.world,
        position: new Vec3(10, -3, 10),
      })
    );
  }

  public update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
  }
}
