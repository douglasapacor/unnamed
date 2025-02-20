import { Vec3 } from "cannon-es";
import GameScene from "../../lib/GameScene";
import { InputController } from "../../lib/InputController";
import Player from "../../lib/Player";
import Terrain from "../../lib/Terrain";
import { ExempleOne } from "../actors/ExempleOne";

export default class MainScene extends GameScene {
  private terrain: Terrain;
  private player: Player;
  public inputController: InputController;

  public preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.player = new Player({
      name: "dummy",
      scene: this.scene,
      world: this.world,
    });
    this.player.preload();
    setTimeout(() => {
      this.addActor(
        new ExempleOne({
          modelname: "enemy",
          name: "exemple_one",
          scene: this.scene,
          world: this.world,
          position: new Vec3(1, 0, 6),
        })
      );
      setTimeout(() => {
        this.addActor(
          new ExempleOne({
            modelname: "enemy",
            name: "exemple_one-1",
            scene: this.scene,
            world: this.world,
            position: new Vec3(2, 0, 9),
          })
        );
      }, 3000);
    }, 8000);
  }

  public create(): void {
    this.inputController = new InputController(this.player);
  }

  public update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
  }
}
