import * as CANNON from "cannon-es";
import * as THREE from "three";
import { events } from "../helpers/Events";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  // private geometry = new THREE.BoxGeometry(0.5, 2, 0.3);
  // private material = new THREE.MeshBasicMaterial({
  //   color: 0xffffff,
  //   wireframe: true,
  // });
  // private cube: THREE.Mesh;
  public attributes: Attributes;

  constructor(
    scene: THREE.Scene,
    world: CANNON.World,
    path: string,
    name?: string
  ) {
    super(world, scene, path, name);
    this.attributes = new Attributes();
    // this.cube = new THREE.Mesh(this.geometry, this.material);
    // scene.add(this.cube);
  }

  update(delta: number): void {
    super.update(delta);

    events.emit("player_position", {
      position: {
        x: this.body.position.x,
        y: this.body.position.y + 1,
        z: this.body.position.z,
      },
    });

    // this.cube.position.copy(
    //   new THREE.Vector3(
    //     this.body.position.x,
    //     this.body.position.y + 1,
    //     this.body.position.z
    //   )
    // );

    // this.cube.quaternion.copy(
    //   new THREE.Quaternion(
    //     this.body.quaternion.z,
    //     this.body.quaternion.y,
    //     this.body.quaternion.z,
    //     this.body.quaternion.w
    //   )
    // );
  }
}
