import * as CANNON from "cannon-es";
import * as THREE from "three";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(
    scene: THREE.Scene,
    world: CANNON.World,
    path: string,
    scale: number,
    name?: string
  ) {
    super(scene, world, path, scale, name);
  }

  update(delta: number): void {
    super.update(delta);
  }
}
