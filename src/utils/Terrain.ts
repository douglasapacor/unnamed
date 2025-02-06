import * as CANNON from "cannon-es";
import * as THREE from "three";

interface ExtendedBody extends CANNON.Body {
  data?: { type: string };
}

export default class Terrain {
  private groundBody!: ExtendedBody;
  private groundShape!: CANNON.Plane;
  private groundMesh!: THREE.Mesh;
  private groundGeometry!: THREE.PlaneGeometry;
  private groundMaterial!: THREE.MeshStandardMaterial;

  constructor(private threeScene: THREE.Scene, private world: CANNON.World) {
    this.groundShape = new CANNON.Plane();

    this.groundBody = new CANNON.Body({
      mass: 0,
      shape: this.groundShape,
    });

    this.groundBody.data = { type: "ground" };

    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    this.world.addBody(this.groundBody);

    this.groundGeometry = new THREE.PlaneGeometry(50, 50);
    this.groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial);

    this.groundMesh.receiveShadow = true;
    this.groundMesh.rotation.x = -Math.PI / 2;

    this.threeScene.add(this.groundMesh);
  }

  update() {
    this.groundMesh.position.copy(this.groundBody.position as any);
    this.groundMesh.quaternion.copy(this.groundBody.quaternion as any);
  }
}
