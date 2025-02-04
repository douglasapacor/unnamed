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
  private boxBody!: CANNON.Body;

  constructor(
    scene: THREE.Scene,
    private world: CANNON.World,
    path: string,
    scale: number,
    name?: string
  ) {
    super(name);

    this.model = new THREE.Object3D();

    this.actions = {};
    this.currentAction = null;

    this.loader = new GLTFLoader();

    this.loader.load(path, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(scale, scale, scale);

      scene.add(this.model);

      this.mixer = new THREE.AnimationMixer(this.model);

      gltf.animations.forEach((clip) => {
        this.actions[clip.name] = this.mixer.clipAction(clip);
      });
    });
  }

  get position(): THREE.Vector3 {
    return this.model.position;
  }

  override create(): void {
    const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    this.boxBody = new CANNON.Body({
      mass: 1,
      shape: boxShape,
    });
    this.boxBody.position.set(0, 10, 0);
    this.world.addBody(this.boxBody);
  }

  override update(delta: number): void {
    if (this.mixer) this.mixer.update(delta);

    this.model.position.copy(this.boxBody.position as any);
    this.model.quaternion.copy(this.boxBody.quaternion as any);
  }

  public playAnimation(name: string, loop: boolean = true): void {
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

  public move(position: THREE.Vector3): void {}

  public rotate(yaw: number): void {
    this.model.rotation.y += yaw;
  }
}
