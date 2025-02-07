import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GameObject from "./GameObject";

export default class Entity extends GameObject {
  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  private actions: Record<string, THREE.AnimationAction>;
  private currentAction: THREE.AnimationAction | null;
  private loader: GLTFLoader;
  public body!: CANNON.Body;

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
    this.loader.load(path, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(1, 1, 1);
      scene.add(this.model);
      this.mixer = new THREE.AnimationMixer(this.model);
      gltf.animations.forEach((clip) => {
        this.actions[clip.name] = this.mixer.clipAction(clip);
      });
    });
  }

  create(): void {
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      velocity: new CANNON.Vec3(0, 0, 0),
      position: new CANNON.Vec3(0, 1, 0),
    });

    this.body.fixedRotation = true;
    this.body.angularDamping = 0.9;
    this.body.updateMassProperties();

    this.world.addBody(this.body);
  }

  update(delta: number): void {
    if (this.mixer) this.mixer.update(delta);

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

  playAnimation(name: string, loop: boolean = true): void {
    if (!this.actions[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this.currentAction) this.currentAction.fadeOut(0.5);

    const action = this.actions[name];

    action.reset();

    if (loop) action.setLoop(THREE.LoopRepeat, Infinity);
    else action.setLoop(THREE.LoopOnce, 1);

    action.clampWhenFinished = !loop;

    action.fadeIn(0.5).play();

    this.currentAction = action;
  }
}
