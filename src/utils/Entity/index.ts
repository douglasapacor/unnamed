import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ECANNONBody, movement } from "./types";

export default class Entity {
  public model: THREE.Object3D;
  private mSize: THREE.Vector3;
  private mixer: THREE.AnimationMixer;
  private animations: Record<string, THREE.AnimationAction> = {};
  private currentAnimation: THREE.AnimationAction | null = null;
  public collisionBody: ECANNONBody;
  private loader: GLTFLoader;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  public loaded: boolean = false;
  private movespeed: number = 0;
  private lastRotationY: number = 0;
  public movement: movement = {
    left: false,
    right: false,
    up: false,
    down: false,
    idle: true,
  };

  constructor(
    private params: {
      path: string;
      scene: THREE.Scene;
      world: CANNON.World;
      position?: CANNON.Vec3;
      name?: string;
    }
  ) {
    this.model = new THREE.Object3D();
    this.mSize = new THREE.Vector3();
    this.loader = new GLTFLoader();

    if (this.params.position)
      this.model.position.copy(
        new THREE.Vector3(
          this.params.position.x,
          this.params.position.y,
          this.params.position.z
        )
      );

    this.loader.load(
      this.params.path,
      (gltf) => {
        this.animTotal = gltf.animations.length;
        this.model = gltf.scene;

        new THREE.Box3().setFromObject(this.model).getSize(this.mSize);
        this.params.scene.add(this.model);

        this.mixer = new THREE.AnimationMixer(this.model);

        this.collisionBody = new CANNON.Body({
          mass: 1,
          shape: new CANNON.Box(
            new CANNON.Vec3(
              this.mSize.x * 0.1,
              this.mSize.y * 0.5,
              this.mSize.z * 0.5
            )
          ),
          position: this.params.position,
          velocity: new CANNON.Vec3(0, 0, 0),
        });
        this.collisionBody.name = this.params.name;
        this.collisionBody.fixedRotation = true;
        this.collisionBody.angularDamping = 0.9;
        this.collisionBody.updateMassProperties();

        this.params.world.addBody(this.collisionBody);

        gltf.animations.forEach((clip) => {
          this.animations[clip.name] = this.mixer.clipAction(clip);
          this.animLoaded += 1;
          if (this.animLoaded >= this.animTotal) this.loaded = true;
        });
      },
      (event) => {
        if (event.loaded >= event.total) this.GLTFloaded = true;
      },
      (err: unknown) => {
        console.error("Erro ao carregar modelo:", err);
      }
    );
  }

  public preload() {}
  public create() {}
  public update(delta: number): void {
    if (this.mixer) this.mixer.update(delta * delta * 0.0001);

    if (this.loaded) {
      this.align();
      this.rotation();
      this.move();
    }
  }

  private align(): void {
    this.model.position.copy(
      new THREE.Vector3(
        this.collisionBody.position.x,
        this.collisionBody.position.y - this.mSize.y * 0.5,
        this.collisionBody.position.z
      )
    );

    this.model.quaternion.copy(
      new THREE.Quaternion(
        this.collisionBody.quaternion.x,
        this.collisionBody.quaternion.y,
        this.collisionBody.quaternion.z,
        this.collisionBody.quaternion.w
      )
    );
  }

  private move(): void {
    let moveX = 0;
    let moveZ = 0;

    if (this.movement.up) {
      moveZ -= 1;
      moveX -= 1;
    }

    if (this.movement.down) {
      moveX += 1;
      moveZ += 1;
    }

    if (this.movement.left) {
      moveX -= 1;
      moveZ += 1;
    }

    if (this.movement.right) {
      moveX += 1;
      moveZ -= 1;
    }

    const direction = new CANNON.Vec3(moveX, 0, moveZ);

    if (direction.length() > 0) {
      direction.normalize();
      direction.scale(this.movespeed, direction);
      this.collisionBody.velocity.x = direction.x;
      this.collisionBody.velocity.z = direction.z;
    } else {
      this.collisionBody.velocity.x = 0;
      this.collisionBody.velocity.z = 0;
    }

    this.movement.idle = moveX === 0 && moveZ === 0;
  }

  private rotation(): void {
    if (
      this.collisionBody.velocity.x !== 0 ||
      this.collisionBody.velocity.z !== 0
    ) {
      const targetRotation = Math.atan2(
        this.collisionBody.velocity.x,
        this.collisionBody.velocity.z
      );

      this.model.rotation.y = THREE.MathUtils.lerp(
        this.model.rotation.y,
        targetRotation,
        1
      );

      this.lastRotationY = this.model.rotation.y;
    } else this.model.rotation.y = this.lastRotationY;
  }

  public playAnimation(name: string, timeScale?: number): void {
    if (!this.GLTFloaded || !this.loaded) return;

    if (!this.animations[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this.currentAnimation === this.animations[name]) return;
    if (this.currentAnimation) this.currentAnimation.fadeOut(0.7);

    this.currentAnimation = this.animations[name];
    this.currentAnimation.reset().fadeIn(0.7).play();
    this.currentAnimation.timeScale = timeScale ? timeScale : 0.7;
  }

  public walkLeftOn(speed: number): void {
    this.movespeed = speed;
    this.movement.left = true;
  }
  public walkLeftOff(): void {
    this.movement.left = false;
  }
  public walkRightOn(speed: number): void {
    this.movespeed = speed;
    this.movement.right = true;
  }
  public walkRightOff(): void {
    this.movement.right = false;
  }
  public walkUpOn(speed: number): void {
    this.movespeed = speed;
    this.movement.up = true;
  }
  public walkUpOff(): void {
    this.movement.up = false;
  }
  public walkDownOn(speed: number): void {
    this.movespeed = speed;
    this.movement.down = true;
  }
  public walkDownOff(): void {
    this.movement.down = false;
  }
}
