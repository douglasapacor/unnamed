import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  attributes: Attributes = new Attributes();

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
  }) {
    super({
      scene: params.scene,
      path: params.path,
      world: params.world,
    });
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.movement.left) this.playAnimation("running_001");
    if (this.movement.right) this.playAnimation("running_001");
    if (this.movement.up) this.playAnimation("running_001");
    if (this.movement.down) this.playAnimation("running_001");
    if (this.movement.idle) this.playAnimation("idle_001");
    if (this.loaded) cameraEvents.emit("player_position", this.body.position);
  }
}
