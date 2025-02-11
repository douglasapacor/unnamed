import * as CANNON from "cannon-es";
import * as THREE from "three";
import BaseObjects from "./BaseObject";

export default class GameObject extends BaseObjects {
  protected body: CANNON.Body;
  private cube?: THREE.Mesh;
  private movementSpeed: number = 0;
  private movement: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    idle: boolean;
  } = { left: false, right: false, up: false, down: false, idle: true };

  constructor(
    protected params: {
      scene: THREE.Scene;
      world: CANNON.World;
      name?: string;
      collider?: boolean;
    }
  ) {
    super({
      name: params.name,
    });
  }

  override create(): void {
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(
        new CANNON.Vec3(
          1.946849256403581,
          1.8047348180759517,
          0.36426869596489897
        )
      ),
      velocity: new CANNON.Vec3(0, 0, 0),
      position: new CANNON.Vec3(0, 1, 0),
    });

    this.body.fixedRotation = true;
    this.body.angularDamping = 0.9;
    this.body.updateMassProperties();

    this.params.world.addBody(this.body);

    if (this.params.collider) {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(
          1.946849256403581,
          1.8047348180759517,
          0.36426869596489897
        ),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
      );

      this.params.scene.add(this.cube);
    }
  }

  protected move(): void {
    if (this.movement.up) this.body.velocity.z -= this.movementSpeed;
    if (this.movement.down) this.body.velocity.z += this.movementSpeed;
    if (this.movement.left) this.body.velocity.x -= this.movementSpeed;
    if (this.movement.right) this.body.velocity.x += this.movementSpeed;

    if (
      !this.movement.up &&
      !this.movement.down &&
      !this.movement.left &&
      !this.movement.right
    )
      this.movement.idle = true;
    else this.movement.idle = false;
  }

  protected align(): void {
    if (this.params.collider) {
      this.cube.position.copy(this.body.position);
      this.cube.quaternion.copy(this.body.quaternion);
    }
  }

  public walkLeftOn(speed: number): void {
    this.movementSpeed = speed;
    this.movement.left = true;
  }
  public walkLeftOff(): void {
    this.movement.left = false;
  }
  public walkRightOn(speed: number): void {
    this.movementSpeed = speed;
    this.movement.right = true;
  }
  public walkRightOff(): void {
    this.movement.right = false;
  }
  public walkUpOn(speed: number): void {
    this.movementSpeed = speed;
    this.movement.up = true;
  }
  public walkUpOff(): void {
    this.movement.up = false;
  }
  public walkDownOn(speed: number): void {
    this.movementSpeed = speed;
    this.movement.down = true;
  }
  public walkDownOff(): void {
    this.movement.down = false;
  }
}
