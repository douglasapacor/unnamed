import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GameObject from "./GameObject";

export default class Entity extends GameObject {
  public model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  public actions: Record<string, THREE.AnimationAction>;
  private currentAction: THREE.AnimationAction | null;
  private loader: GLTFLoader;
  public body!: CANNON.Body;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  private animEnd: boolean = false;

  constructor(
    private world: CANNON.World,
    scene: THREE.Scene,
    path: string,
    name?: string
  ) {
    super(name);
    this.model = new THREE.Object3D();
    this.actions = {};
    this.currentAction = null;
    this.loader = new GLTFLoader();
    this.loader.load(
      path,
      (gltf) => {
        this.animTotal = gltf.animations.length;

        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);

        scene.add(this.model);

        this.mixer = new THREE.AnimationMixer(this.model);

        gltf.animations.forEach((clip) => {
          this.actions[clip.name] = this.mixer.clipAction(clip);

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

  playAnimation(name: string): void {
    if (!this.GLTFloaded || !this.animEnd) return;
    if (this.currentAction === this.actions[name]) return;
    if (this.currentAction) this.currentAction.fadeOut(0.5);

    this.currentAction = this.actions[name];

    this.currentAction.reset().fadeIn(0.5).play();
    this.currentAction.timeScale = 0.7;
  }

  create(): void {
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(0.4, 0.8, 0.15)),
      velocity: new CANNON.Vec3(0, 0, 0),
      position: new CANNON.Vec3(0, 1, 0),
    });

    this.body.fixedRotation = true;
    this.body.angularDamping = 0.9;
    this.body.updateMassProperties();

    this.world.addBody(this.body);
  }

  update(delta: number): void {
    if (this.mixer) this.mixer.update(delta * delta * 0.0001);

    this.model.position.copy(
      new THREE.Vector3(
        this.body.position.x,
        this.body.position.y,
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
}
