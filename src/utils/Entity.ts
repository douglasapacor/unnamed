import * as CANNON from "cannon-es";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GameObject from "./GameObject";

export default class Entity extends GameObject {
  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  private animations: Record<string, THREE.AnimationAction> = {};
  private currentAnimation: THREE.AnimationAction | null = null;
  private loader: GLTFLoader;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  private animEnd: boolean = false;

  constructor(
    protected params: {
      name?: string;
      path: string;
      scene: THREE.Scene;
      world: CANNON.World;
      collider?: boolean;
    }
  ) {
    super({
      name: params.name,
      scene: params.scene,
      world: params.world,
      collider: params.collider,
    });

    this.model = new THREE.Object3D();
    this.loader = new GLTFLoader();
  }

  override preload(): void {
    this.loader.load(
      this.params.path,
      (gltf) => {
        this.animTotal = gltf.animations.length;

        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);

        this.params.scene.add(this.model);

        const box = new THREE.Box3().setFromObject(this.model);
        const size = new THREE.Vector3();
        box.getSize(size);

        console.log("Tamanho do modelo:", size);

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

  override update(delta: number): void {
    if (this.mixer) {
      this.mixer.update(delta * delta * 0.0001);
    }

    this.align();
    this.rotation();
    this.move();
  }

  public align(): void {
    super.align();

    this.model.position.copy(
      new THREE.Vector3(
        this.body.position.x,
        this.body.position.y - 0.9,
        this.body.position.z
      )
    );

    this.model.quaternion.copy(this.body.quaternion);

    this.body.velocity.set(0, this.body.velocity.y, 0);
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
}
