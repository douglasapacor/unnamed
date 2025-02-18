import Collider from "../../utils/Collider";
import { MODELS } from "../../config/directories";
import Entity from "../../utils/Entity";
import { Features } from "../../utils/Features";
import { enemyModelContructor } from "./types";

export default class EnemyModel extends Entity {
  private features: Features;
  private aggro: Collider;

  constructor(private param: enemyModelContructor) {
    super({
      name: "zombie_01",
      scene: param.scene,
      world: param.world,
      path: MODELS.enemy,
      position: param.position,
    });

    this.aggro = new Collider(
      { name: "aggroasd", radius: 5, debug: false, collisionResponse: false },
      this.param.scene,
      this.param.world
    );
  }

  public preload(): void {
    this.features = new Features();
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.collisionBody) this.aggro.attach(this.collisionBody.position);

    this.aggro.update();

    if (this.movement.idle) this.playAnimation("idle_001");
  }
}
