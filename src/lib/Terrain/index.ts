import * as CANNON from "cannon-es";
import * as THREE from "three";
import { ECBody } from "./type";

export default class Terrain {
  private body: ECBody;
  private shape: CANNON.Box;
  private mesh: THREE.Mesh;
  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshStandardMaterial;

  constructor(params: { scene: THREE.Scene; world: CANNON.World }) {
    this.shape = new CANNON.Box(new CANNON.Vec3(80, 0.3, 80));
    this.body = new CANNON.Body({
      mass: 0,
      shape: this.shape,
      position: new CANNON.Vec3(0, -5, 0),
    });
    this.body.data = { type: "ground" };

    params.world.addBody(this.body);

    this.geometry = new THREE.BoxGeometry(160, 0.6, 160);

    // this.material = new THREE.MeshStandardMaterial({ color: 0x996600 });
    this.material = new THREE.MeshStandardMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;

    params.scene.add(this.mesh);
  }

  update(delta: number) {
    this.mesh.position.copy(
      new THREE.Vector3(
        this.body.position.x,
        this.body.position.y,
        this.body.position.z
      )
    );

    this.mesh.quaternion.copy(
      new THREE.Quaternion(
        this.body.quaternion.x,
        this.body.quaternion.y,
        this.body.quaternion.z,
        this.body.quaternion.w
      )
    );
  }
}
