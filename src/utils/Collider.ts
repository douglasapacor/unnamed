import * as CANNON from "cannon-es";
import * as THREE from "three";
interface CannonBodyExtended extends CANNON.Body {
  name?: string;
}

export default class Collider {
  public collider: CannonBodyExtended;
  private in = new Set<CannonBodyExtended>();
  private radius: number;
  private mesh: THREE.Mesh;
  public onCollide?: (event: any) => void;

  constructor(
    private param: {
      name: string;
      radius: number;
      collisionResponse?: boolean;
      debug?: boolean;
      ignore?: string[];
    },
    scene: THREE.Scene,
    world: CANNON.World
  ) {
    this.radius = this.param.radius;

    this.collider = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(this.radius),
      type: CANNON.Body.KINEMATIC,
      collisionResponse: this.param.collisionResponse ? true : false,
    });

    this.collider.name = this.param.name;

    this.collider.addEventListener("collide", (event: any) => {
      if (this.param.ignore) {
        const find = this.param.ignore.findIndex(
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

    world.addBody(this.collider);

    if (this.param.debug) {
      this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(this.param.radius),
        new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
      );

      this.mesh.position.copy(this.collider.position);

      scene.add(this.mesh);
    }
  }

  attach(position: CANNON.Vec3) {
    this.collider.position.copy(position);
    if (this.param.debug) this.mesh.position.copy(position);
  }

  update() {
    this.in.forEach((body) => {
      if (
        this.collider.position.distanceTo(body.position) >
        this.radius + 0.3
      ) {
        this.in.delete(body);
      }
    });
  }
}
