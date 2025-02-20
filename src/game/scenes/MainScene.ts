import GameScene from "../../lib/GameScene";
import { InputController } from "../../lib/InputController";
import Player from "../../lib/Player";
import Terrain from "../../lib/Terrain";

export default class MainScene extends GameScene {
  private terrain: Terrain;
  private player: Player;
  private inputController: InputController;

  public preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.player = new Player({
      name: "dummy",
      scene: this.scene,
      world: this.world,
    });
    this.player.preload();
  }

  public create(): void {
    this.inputController = new InputController(this.player);
  }

  public update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
  }
}
