import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ECANNONBody extends CANNON.Body {
  data?: any;
}

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
  public movement: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    idle: boolean;
  } = { left: false, right: false, up: false, down: false, idle: true };
  private perceptionBody: ECANNONBody;
  public detectedBodys = new Set<ECANNONBody>();
  public alert: boolean = false;

  constructor(
    private params: {
      path: string;
      scene: THREE.Scene;
      world: CANNON.World;
      position?: CANNON.Vec3;
      perceptionRadius?: number;
      name?: string;
    }
  ) {
    this.model = new THREE.Object3D();
    this.mSize = new THREE.Vector3();
    this.loader = new GLTFLoader();

    if (this.params.perceptionRadius) {
      this.perceptionBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Sphere(this.params.perceptionRadius),
        type: CANNON.Body.KINEMATIC,
        collisionFilterGroup: 2,
        collisionFilterMask: -1,
        collisionResponse: false,
      });
      this.perceptionBody.data = `perception-${this.params.name}-body`;
      this.perceptionBody.addEventListener("collide", (event: any) =>
        this.onEnterPerceptionBody(event.body)
      );

      if (this.params.position)
        this.perceptionBody.position.copy(this.params.position);

      this.params.world.addBody(this.perceptionBody);
    }

    if (this.params.position) {
      this.model.position.copy(
        new THREE.Vector3(
          this.params.position.x,
          this.params.position.y,
          this.params.position.z
        )
      );
    }

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

        this.collisionBody.data = `${this.params.name}-body`;

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

  public update(delta: number): void {
    if (this.mixer) this.mixer.update(delta * delta * 0.0001);

    if (this.loaded) {
      this.align();
      this.rotation();
      this.move();
      this.perception();
    }
  }

  private perception(): void {
    this.detectedBodys.forEach((body) => {
      const distance = this.perceptionBody.position.distanceTo(body.position);
      if (distance > this.params.perceptionRadius + 0.3) {
        this.detectedBodys.delete(body);

        if (this.detectedBodys.size <= 0) {
          this.alert = false;
        }
      }
    });
  }

  private align(): void {
    this.model.position.copy(
      new THREE.Vector3(
        this.collisionBody.position.x,
        this.collisionBody.position.y - this.mSize.y * 0.5,
        this.collisionBody.position.z
      )
    );

    if (this.params.perceptionRadius)
      this.perceptionBody.position.copy(this.collisionBody.position);

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
    if (this.movement.up) this.collisionBody.velocity.z -= this.movespeed;
    if (this.movement.down) this.collisionBody.velocity.z += this.movespeed;
    if (this.movement.left) this.collisionBody.velocity.x -= this.movespeed;
    if (this.movement.right) this.collisionBody.velocity.x += this.movespeed;

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

  private onEnterPerceptionBody(body: ECANNONBody): void {
    if (this.loaded) {
      if (body.data !== this.collisionBody.data) {
        if (!this.detectedBodys.has(body)) {
          this.detectedBodys.add(body);
          this.alert = true;
        }
      }
    }
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
