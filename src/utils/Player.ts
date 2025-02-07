import * as CANNON from "cannon-es";
import * as THREE from "three";
import { events } from "../helpers/Events";
import { Attributes } from "./Attributes";
import Entity from "./Entity";

export default class Player extends Entity {
  private cube?: THREE.Mesh;
  private showBoxCollider?: boolean;
  public attributes: Attributes;
  private status: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
  };

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    input: Phaser.Input.InputPlugin;
    path: string;
    name?: string;
    showBoxCollider?: boolean;
  }) {
    super(params.world, params.scene, params.path, params.name);

    this.showBoxCollider = params.showBoxCollider;
    this.attributes = new Attributes();

    if (params.showBoxCollider) {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.3),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
      );

      params.scene.add(this.cube);
    }

    params.input.keyboard.on("keydown-" + "W", () => {
      this.status["left"] = true;
    });

    params.input.keyboard.on("keydown-" + "A", () => {
      this.status["right"] = true;
    });

    params.input.keyboard.on("keydown-" + "S", () => {
      this.status["down"] = true;
    });

    params.input.keyboard.on("keydown-" + "D", () => {
      this.status["up"] = true;
    });
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

    if (this.showBoxCollider) {
      this.cube.position.copy(
        new THREE.Vector3(
          this.body.position.x,
          this.body.position.y + 1,
          this.body.position.z
        )
      );

      this.cube.quaternion.copy(
        new THREE.Quaternion(
          this.body.quaternion.z,
          this.body.quaternion.y,
          this.body.quaternion.z,
          this.body.quaternion.w
        )
      );
    }
  }
}
