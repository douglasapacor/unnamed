import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  public attributes: Attributes = new Attributes();

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
      name: "player",
    });
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.movement.left) this.playAnimation("running_001");
    if (this.movement.right) this.playAnimation("running_001");
    if (this.movement.up) this.playAnimation("running_001");
    if (this.movement.down) this.playAnimation("running_001");

    if (this.movement.idle) this.playAnimation("idle_001");

    if (this.loaded) {
      cameraEvents.emit(
        "player_position",
        new THREE.Vector3(
          this.collisionBody.position.x,
          this.collisionBody.position.y,
          this.collisionBody.position.z
        )
      );
    }
  }
}
