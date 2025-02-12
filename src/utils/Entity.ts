import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Entity {
  private model: THREE.Object3D;
  private mSize: THREE.Vector3;
  private mixer: THREE.AnimationMixer;
  private animations: Record<string, THREE.AnimationAction> = {};
  private currentAnimation: THREE.AnimationAction | null = null;
  protected body: CANNON.Body;
  private loader: GLTFLoader;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  public loaded: boolean = false;
  private movespeed: number = 0;
  public movement: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    idle: boolean;
  } = { left: false, right: false, up: false, down: false, idle: true };

  constructor(params: {
    path: string;
    scene: THREE.Scene;
    world: CANNON.World;
  }) {
    this.model = new THREE.Object3D();
    this.loader = new GLTFLoader();
    this.mSize = new THREE.Vector3();
    this.loader.load(
      params.path,
      (gltf) => {
        this.animTotal = gltf.animations.length;
        this.model = gltf.scene;

        new THREE.Box3().setFromObject(this.model).getSize(this.mSize);

        params.scene.add(this.model);

        this.body = new CANNON.Body({
          mass: 1,
          shape: new CANNON.Box(
            new CANNON.Vec3(
              this.mSize.x * 0.1,
              this.mSize.y * 0.5,
              this.mSize.z * 0.5
            )
          ),
          velocity: new CANNON.Vec3(0, 0, 0),
        });
        this.body.fixedRotation = true;
        this.body.angularDamping = 0.9;
        this.body.updateMassProperties();

        params.world.addBody(this.body);

        this.mixer = new THREE.AnimationMixer(this.model);

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
        this.body.position.x,
        this.body.position.y - this.mSize.y * 0.5,
        this.body.position.z
      )
    );

    this.model.quaternion.copy(
      new THREE.Quaternion(
        this.body.quaternion.x,
        this.body.quaternion.y,
        this.body.quaternion.z,
        this.body.quaternion.w
      )
    );

    this.body.velocity.set(0, this.body.velocity.y, 0);
  }

  private move(): void {
    if (this.movement.up) this.body.velocity.z -= this.movespeed;
    if (this.movement.down) this.body.velocity.z += this.movespeed;
    if (this.movement.left) this.body.velocity.x -= this.movespeed;
    if (this.movement.right) this.body.velocity.x += this.movespeed;

    if (
      !this.movement.up &&
      !this.movement.down &&
      !this.movement.left &&
      !this.movement.right
    )
      this.movement.idle = true;
    else this.movement.idle = false;
  }

  private rotation(): void {
    const velocity = this.body.velocity;

    if (velocity.x !== 0 || velocity.z !== 0) {
      const targetRotation = Math.atan2(velocity.x, velocity.y);

      this.model.rotation.y = THREE.MathUtils.lerp(
        this.model.rotation.y,
        targetRotation,
        0.1
      );
    }
  }

  public playAnimation(name: string, timeScale?: number): void {
    if (!this.GLTFloaded || !this.loaded) return;

    if (!this.animations[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this.currentAnimation === this.animations[name]) return;

    if (this.currentAnimation) this.currentAnimation.fadeOut(0.5);

    this.currentAnimation = this.animations[name];
    this.currentAnimation.reset().fadeIn(0.5).play();
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
