import * as CANNON from "cannon-es";
import * as THREE from "three";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  public attributes: Attributes;
  private geometry = new THREE.BoxGeometry(1, 2, 0.5);
  private material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  private cube: THREE.Mesh;

  constructor(
    scene: THREE.Scene,
    world: CANNON.World,
    path: string,
    scale: number,
    name?: string
  ) {
    super(scene, world, path, scale, name);
    this.attributes = new Attributes(20);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.cube);
  }

  update(delta: number): void {
    super.update(delta);

    this.cube.position.copy(this.body.position as any);
    this.cube.quaternion.copy(this.body.quaternion as any);
  }
}
