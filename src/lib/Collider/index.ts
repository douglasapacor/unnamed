import * as CANNON from "cannon-es";
import * as THREE from "three";
import { collider, ECBody } from "./type";

export class Collider {
  public collider: ECBody;
  private radius: number;
  private mesh: THREE.Mesh;
  private in = new Set<ECBody>();
  public onCollide?: (event: any) => void;

  constructor(private params: collider) {}

  preload(): void {
    this.radius = this.params.radius;

    this.collider = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(this.radius),
      type: CANNON.Body.KINEMATIC,
      collisionResponse: this.params.collisionResponse,
      position: this.params.position,
    });

    this.collider.name = this.params.name;

    this.collider.addEventListener("collide", (event: any) => {
      if (this.params.ignore) {
        const find = this.params.ignore.findIndex(
          (ig) => ig === event.body.name
        );

        if (find <= -1) {
          if (!this.in.has(event.body)) this.in.add(event.body);
          if (this.onCollide) this.onCollide(event);
        }
      } else {
        if (!this.in.has(event.body)) this.in.add(event.body);
        if (this.onCollide) this.onCollide(event);
      }
    });

    this.params.world.addBody(this.collider);

    if (this.params.debug) {
      this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(this.params.radius),
        new THREE.MeshBasicMaterial({
          color: this.params.color ? this.params.color : 0xffffff,
          wireframe: true,
        })
      );

      this.mesh.position.copy(this.collider.position);

      this.params.scene.add(this.mesh);
    }
  }

  attach(position: CANNON.Vec3) {
    this.collider.position.copy(position);
    if (this.params.debug) this.mesh.position.copy(position);
  }

  update() {
    this.in.forEach((body) => {
      if (
        this.collider.position.distanceTo(body.position) >
        this.radius + 0.1
      ) {
        this.in.delete(body);
      }
    });
  }
}
