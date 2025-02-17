import * as CANNON from "cannon-es";
import * as THREE from "three";
import { Attributes } from "./Attributes";
import Entity from "./Entity";
import Collider from "./Collider";

export default class Enemy extends Entity {
  public attributes: Attributes = new Attributes();
  private enemies: Collider;

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
    position?: CANNON.Vec3;
    name?: string;
  }) {
    super({
      scene: params.scene,
      path: params.path,
      world: params.world,
      position: params.position,
      name: params.name,
    });

    this.enemies = new Collider(
      { name: "enemies", radius: 3, ignore: ["enemy"], debug: true },
      params.scene,
      params.world
    );

    this.enemies.onCollide = (event: any) => {
      console.log(event.body);
    };
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.collisionBody) {
      this.enemies.attach(this.collisionBody.position);
    }

    this.enemies.update();

    if (this.movement.left) this.playAnimation("running");
    if (this.movement.right) this.playAnimation("running");
    if (this.movement.up) this.playAnimation("running");
    if (this.movement.down) this.playAnimation("running");
    if (this.movement.idle) this.playAnimation("idle_001");
  }
}
