import * as THREE from "three";
import * as CANNON from "cannon-es";
import GObject from "./GObject";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class GEntity extends GObject {
  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  private actions: Record<string, THREE.AnimationAction> = {};
  private currentAction: THREE.AnimationAction | null = null;
  private loader: GLTFLoader;
  private body: CANNON.Body;
  private cube?: THREE.Mesh;
  private animTotal: number = 0;
  private animLoaded: number = 0;
  private GLTFloaded: boolean = false;
  private animEnd: boolean = false;

  constructor(
    private params: {
      name?: string;
      path: string;
      scene: THREE.Scene;
      world: CANNON.World;
    }
  ) {
    super({ name: params.name });

    this.model = new THREE.Object3D();
    this.loader = new GLTFLoader();
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2, 0.3),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      })
    );

    this.params.scene.add(this.cube);
  }

  override preload(): void {
    this.loader.load(
      this.params.path,
      (gltf) => {
        this.animTotal = gltf.animations.length;

        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);

        this.params.scene.add(this.model);

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

  override create(): void {
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(0.4, 0.8, 0.15)),
      velocity: new CANNON.Vec3(0, 0, 0),
      position: new CANNON.Vec3(0, 1, 0),
    });

    this.body.fixedRotation = true;
    this.body.angularDamping = 0.9;
    this.body.updateMassProperties();
    this.params.world.addBody(this.body);
  }

  override update(delta: number): void {
    if (this.mixer) this.mixer.update(delta * delta * 0.0001);

    this.alignComponents();
    this.rotation();
  }

  private alignComponents(): void {
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

  private rotation(): void {
    if (this.body.velocity.x !== 0 || this.body.velocity.z !== 0) {
      this.model.rotation.y = THREE.MathUtils.lerp(
        this.model.rotation.y,
        Math.atan2(this.body.velocity.x, this.body.velocity.z),
        1
      );
    }
  }

  public playAnimation(name: string): void {
    if (!this.GLTFloaded || !this.animEnd) return;

    if (!this.actions[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this.currentAction === this.actions[name]) return;

    if (this.currentAction) this.currentAction.fadeOut(0.5);

    this.currentAction = this.actions[name];

    this.currentAction.reset().fadeIn(0.5).play();

    this.currentAction.timeScale = 0.7;
  }
}
