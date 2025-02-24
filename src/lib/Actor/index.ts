import { Body, Box, Vec3, World } from "cannon-es";
import {
  AnimationAction,
  AnimationMixer,
  Box3,
  MathUtils,
  Object3D,
  Quaternion,
  Scene,
  Vector3,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ECBody } from "./type";

export default class Actor {
  public readonly _name: string;
  private _modelname: string;
  private _model: Object3D;
  private _path: string;
  private _size: Vector3;
  private _mixer!: AnimationMixer;
  private _body!: ECBody;
  private _actions: Record<string, AnimationAction> = {};
  private _action: AnimationAction | null = null;
  private _loader: GLTFLoader;
  private _lastRotationY: number = 0;
  private _isActorReady: boolean = false;
  private _isActionsReady: boolean = false;
  private _isModelReady: boolean = false;
  private _totalActions: number = 0;
  private _actionsLoaded: number = 0;

  constructor(
    protected params: {
      name: string;
      modelname: string;
      scene: Scene;
      world: World;
      position?: Vec3;
    }
  ) {
    this._name = params.name;
    this._modelname = params.modelname;
    this._path = `/assets/models/${this._modelname}.glb`;
    this._model = new Object3D();
    this._size = new Vector3();
    this._loader = new GLTFLoader();
  }

  public get body(): ECBody {
    return this._body;
  }

  public get model(): Object3D {
    return this._model;
  }

  public get actions(): Record<string, AnimationAction> {
    return this._actions;
  }

  public get isReady(): boolean {
    return this._isActorReady;
  }

  public preload() {
    this._loader.load(
      this._path,
      (gltf: GLTF) => {
        this._totalActions = gltf.animations.length;
        this._model = gltf.scene;
        this._model.matrixAutoUpdate = true;

        new Box3().setFromObject(this._model).getSize(this._size);

        this.params.scene.add(this._model);

        this._mixer = new AnimationMixer(this._model);

        this._body = new Body({
          mass: 1,
          shape: new Box(
            new Vec3(this._size.x * 0.1, this._size.y * 0.5, this._size.z * 0.5)
          ),
          position: this.params.position,
          velocity: new Vec3(0, 0, 0),
        });

        this._body.name = this.params.name;

        this._body.fixedRotation = true;
        this._body.angularDamping = 0.9;
        this._body.updateMassProperties();

        this.params.world.addBody(this._body);

        gltf.animations.forEach((clip) => {
          this._actions[clip.name] = this._mixer.clipAction(clip);
          this._actionsLoaded += 1;

          if (this._actionsLoaded >= this._totalActions)
            this._isActionsReady = true;
        });
      },
      (event: ProgressEvent<EventTarget>) => {
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
    if (this._isActorReady) {
      if (this._mixer) this._mixer.update(delta);

      this.align();
    } else {
      if (this._isActionsReady && this._isModelReady) {
        this._isActorReady = true;
      }
    }
  }

  private align(): void {
    this._model.position.copy(
      new Vector3(
        this._body.position.x,
        this._body.position.y - this._size.y * 0.5,
        this._body.position.z
      )
    );

    this._model.quaternion.copy(
      new Quaternion(
        this._body.quaternion.x,
        this._body.quaternion.y,
        this._body.quaternion.z,
        this._body.quaternion.w
      )
    );
  }

  public playAnimation(name: string, timeScale?: number): void {
    if (!this._isActorReady) return;

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
}
