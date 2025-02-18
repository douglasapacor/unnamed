import GameScene from "../../lib/GameScene";
import Terrain from "../../lib/Terrain";

export default class MainScene extends GameScene {
  private terrain: Terrain;

  public preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
  }

  public create(): void {}

  public update(delta: number): void {
    this.terrain.update(delta);
  }
}
