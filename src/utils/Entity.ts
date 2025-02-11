import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Entity {
  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  private animations: Record<string, THREE.AnimationAction> = {};
  private currentAnimation: THREE.AnimationAction | null = null;
  protected body: CANNON.Body;
  private cube?: THREE.Mesh;
  private loader: GLTFLoader;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  private animEnd: boolean = false;
  private movespeed: number = 0;
  private movement: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    idle: boolean;
  } = { left: false, right: false, up: false, down: false, idle: true };

  constructor(
    private params: {
      path: string;
      scene: THREE.Scene;
      world: CANNON.World;
      debug?: boolean;
    }
  ) {
    this.model = new THREE.Object3D();
    this.loader = new GLTFLoader();
  }

  public preload(): void {
    this.loader.load(
      this.params.path,
      (gltf) => {
        this.animTotal = gltf.animations.length;

        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);

        this.params.scene.add(this.model);

        this.mixer = new THREE.AnimationMixer(this.model);

        gltf.animations.forEach((clip) => {
          this.animations[clip.name] = this.mixer.clipAction(clip);

          this.animLoaded += 1;

          if (this.animLoaded >= this.animTotal) this.animEnd = true;
        });
      },
      (event) => {
        if (event.loaded >= event.total) {
          this.GLTFloaded = true;
        }
      }
    );
  }

  public create(): void {
    const box = new THREE.Box3().setFromObject(this.model);
    const size = new THREE.Vector3();

    box.getSize(size);

    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(size.x, size.y, size.z)),
      velocity: new CANNON.Vec3(0, 0, 0),
      position: new CANNON.Vec3(0, 1, 0),
    });

    this.body.fixedRotation = true;
    this.body.angularDamping = 0.9;
    this.body.updateMassProperties();

    this.params.world.addBody(this.body);

    if (this.params.debug) {
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
      );

      this.params.scene.add(this.cube);
    }
  }

  public update(delta: number): void {
    if (this.mixer) this.mixer.update(delta * delta * 0.0001);

    this.align();
    this.rotation();
    this.move();
  }

  private align(): void {
    this.model.position.copy(this.body.position);
    this.model.quaternion.copy(this.body.quaternion);

    if (this.params.debug) {
      this.cube.position.copy(this.body.position);
      this.cube.quaternion.copy(this.body.quaternion);
    }

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
    if (this.body.velocity.x !== 0 || this.body.velocity.z !== 0) {
      this.model.rotation.y = THREE.MathUtils.lerp(
        this.model.rotation.y,
        Math.atan2(this.body.velocity.x, this.body.velocity.z),
        1
      );
    }
  }

  public playAnimation(name: string, timeScale?: number): void {
    if (!this.GLTFloaded || !this.animEnd) return;

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
