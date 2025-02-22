import * as CANNON from "cannon-es";
import * as THREE from "three";
import { AnimationAction, AnimationMixer, Object3D, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ECBody, moves } from "./type";

export default class Entity {
  private _model: Object3D;
  private _path: string;
  private _size: Vector3;
  private _mixer!: AnimationMixer;
  private _actions: Record<string, AnimationAction> = {};
  private _action: AnimationAction | null = null;
  private _body!: ECBody;
  private _loader: GLTFLoader;
  private _lastRotationY: number = 0;
  private _movespeed: number = 0;
  private _moves: moves;
  private _isEntityReady: boolean = false;
  private _isActionsReady: boolean = false;
  private _isModelReady: boolean = false;
  private _totalActions: number = 0;
  private _actionsLoaded: number = 0;

  constructor(
    protected params: {
      name: string;
      model: string;
      scene: THREE.Scene;
      world: CANNON.World;
      position?: CANNON.Vec3;
    }
  ) {
    this._path = `/assets/models/${params.model}.glb`;
    this._moves = {
      up: false,
      down: false,
      left: false,
      right: false,
      idle: true,
    };
    this._model = new THREE.Object3D();
    this._size = new THREE.Vector3();
    this._loader = new GLTFLoader();
  }

  public get body(): ECBody {
    return this._body;
  }

  public get moves(): moves {
    return this._moves;
  }

  public get actions(): Record<string, AnimationAction> {
    return this._actions;
  }

  public get isReady(): boolean {
    return this._isEntityReady;
  }

  public preload() {
    this._loader.load(
      this._path,
      (gltf: GLTF) => {
        this._totalActions = gltf.animations.length;
        this._model = gltf.scene;
        this._model.matrixAutoUpdate = true;

        new THREE.Box3().setFromObject(this._model).getSize(this._size);

        this.params.scene.add(this._model);

        this._mixer = new THREE.AnimationMixer(this._model);

        this._body = new CANNON.Body({
          mass: 1,
          shape: new CANNON.Box(
            new CANNON.Vec3(
              this._size.x * 0.1,
              this._size.y * 0.5,
              this._size.z * 0.5
            )
          ),
          position: this.params.position,
          velocity: new CANNON.Vec3(0, 0, 0),
        });

        this._body.name = this.params.name;

        this._body.fixedRotation = true;
        this._body.angularDamping = 0.9;
        this._body.updateMassProperties();

        this.params.world.addBody(this._body);

        gltf.animations.forEach((clip) => {
          this._actions[clip.name] = this._mixer.clipAction(clip);
          this._actionsLoaded += 1;

          if (this._actionsLoaded >= this._totalActions) {
            this._isActionsReady = true;
          }
        });
      },
      (event) => {
        if (event.loaded >= event.total) {
          this._isModelReady = true;
        }
      },
      (err: unknown) => {
        console.error("Erro ao carregar modelo:", err);
      }
    );
  }

  public update(delta: number) {
    if (this._isEntityReady) {
      if (this._mixer) this._mixer.update(delta);

      this.align();
      this.rotation();
      this.move();
    } else {
      if (this._isActionsReady && this._isModelReady) {
        this._isEntityReady = true;
      }
    }
  }

  private align(): void {
    this._model.position.copy(
      new THREE.Vector3(
        this._body.position.x,
        this._body.position.y - this._size.y * 0.5,
        this._body.position.z
      )
    );

    this._model.quaternion.copy(
      new THREE.Quaternion(
        this._body.quaternion.x,
        this._body.quaternion.y,
        this._body.quaternion.z,
        this._body.quaternion.w
      )
    );
  }

  private rotation(): void {
    if (this._body.velocity.x !== 0 || this._body.velocity.z !== 0) {
      const targetRotation = Math.atan2(
        this._body.velocity.x,
        this._body.velocity.z
      );

      this._model.rotation.y = THREE.MathUtils.lerp(
        this._model.rotation.y,
        targetRotation,
        1
      );

      this._lastRotationY = this._model.rotation.y;
    } else {
      this._model.rotation.y = this._lastRotationY;
    }
  }

  private move(): void {
    let moveX = 0;
    let moveZ = 0;

    if (this._moves.up) {
      moveZ -= 1;
      moveX -= 1;
    }

    if (this._moves.down) {
      moveX += 1;
      moveZ += 1;
    }

    if (this._moves.left) {
      moveX -= 1;
      moveZ += 1;
    }

    if (this._moves.right) {
      moveX += 1;
      moveZ -= 1;
    }

    const direction = new CANNON.Vec3(moveX, 0, moveZ);

    if (direction.length() > 0) {
      direction.normalize();
      direction.scale(this._movespeed, direction);
      this.body.velocity.x = direction.x;
      this.body.velocity.z = direction.z;
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.z = 0;
    }

    this._moves.idle = moveX === 0 && moveZ === 0;
  }

  public playAnimation(name: string, timeScale?: number): void {
    if (!this._isEntityReady) return;

    if (!this._actions[name]) {
      console.warn(`A animação "${name}" não foi encontrada!`);
      return;
    }

    if (this._action === this._actions[name]) return;

    if (this._action) this._action.fadeOut(0.7);

    this._action = this._actions[name];
    this._action.reset().fadeIn(0.7).play();
    this._action.timeScale = timeScale ? timeScale : 1;
  }

  public walkLeftOn(speed: number): void {
    this._movespeed = speed;
    this._moves.left = true;
  }

  public walkLeftOff(): void {
    this._moves.left = false;
  }

  public walkRightOn(speed: number): void {
    this._movespeed = speed;
    this._moves.right = true;
  }

  public walkRightOff(): void {
    this._moves.right = false;
  }

  public walkUpOn(speed: number): void {
    this._movespeed = speed;
    this._moves.up = true;
  }

  public walkUpOff(): void {
    this._moves.up = false;
  }

  public walkDownOn(speed: number): void {
    this._movespeed = speed;
    this._moves.down = true;
  }

  public walkDownOff(): void {
    this._moves.down = false;
  }
}
