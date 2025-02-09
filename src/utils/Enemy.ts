import Entity from "./Entity";
import * as CANNON from "cannon-es";
import * as THREE from "three";

export default class Enemy extends Entity {
  private cube?: THREE.Mesh;
  private showBoxCollider?: boolean;

  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
    name?: string;
    showBoxCollider?: boolean;
  }) {
    super(params.world, params.scene, params.path, params.name);
    this.boxcolliderSettings(params.showBoxCollider, params.scene);
  }

  private boxcolliderSettings(show: boolean, scene: THREE.Scene) {
    this.showBoxCollider = show;

    if (this.showBoxCollider) {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 0.3),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
      );

      scene.add(this.cube);
    }
  }

  private boxcolliderSystem(): void {
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

  public update(delta: number): void {
    super.update(delta);
    this.boxcolliderSystem();
  }
}
