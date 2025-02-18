import { MODELS } from "../../config/directories";
import Entity from "../../utils/Entity";
import { Features } from "../../utils/Features";
import { enemyModelContructor } from "./types";

export default class EnemyModel extends Entity {
  private features: Features;

  constructor(private param: enemyModelContructor) {
    super({
      name: "zombie_01",
      scene: param.scene,
      world: param.world,
      path: MODELS.enemy,
      position: param.position,
    });
  }

  public preload(): void {
    this.features = new Features();
  }

  public update(delta: number): void {
    super.update(delta);
    if (this.movement.idle) this.playAnimation("idle_001");
  }
}
