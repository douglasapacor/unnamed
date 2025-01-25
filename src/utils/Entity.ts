import * as THREE from "three";
import GameObject from "./GameObject";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Entity extends GameObject {
  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  public actions: { [key: string]: THREE.AnimationAction };
  private currentAction: THREE.AnimationAction | null;

  constructor(
    scene: THREE.Scene,
    modelPath: string,
    scale: number,
    name?: string
  ) {
    super(name);

    this.model = new THREE.Object3D();
    this.actions = {};
    this.currentAction = null;

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(scale, scale, scale);
      scene.add(this.model);

      this.mixer = new THREE.AnimationMixer(this.model);

      gltf.animations.forEach((clip) => {
        const action = this.mixer.clipAction(clip);
        this.actions[clip.name] = action;
      });
    });
  }

  playAnimation(name: string, loop: boolean = true): void {
    if (!this.actions[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this.currentAction) {
      this.currentAction.fadeOut(0.5);
    }

    const action = this.actions[name];

    action.reset();

    if (loop) action.setLoop(THREE.LoopRepeat, Infinity);
    else action.setLoop(THREE.LoopOnce, 1);

    action.clampWhenFinished = !loop;

    action.fadeIn(0.5).play();

    this.currentAction = action;
  }

  override update(delta: number): void {
    if (this.mixer) this.mixer.update(delta);
  }

  move(x: number, y: number, z: number): void {
    this.model.position.add(new THREE.Vector3(x, y, z));
  }

  rotate(yaw: number): void {
    this.model.rotation.y += yaw;
  }
}
