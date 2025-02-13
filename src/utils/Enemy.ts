import * as CANNON from "cannon-es";
import * as THREE from "three";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Enemy extends Entity {
  attributes: Attributes = new Attributes();

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
    position?: CANNON.Vec3;
  }) {
    super({
      scene: params.scene,
      path: params.path,
      world: params.world,
      position: params.position,
    });
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.movement.left) this.playAnimation("running");
    if (this.movement.right) this.playAnimation("running");
    if (this.movement.up) this.playAnimation("running");
    if (this.movement.down) this.playAnimation("running");
    if (this.movement.idle) this.playAnimation("idle_001");
  }
}
