import * as THREE from "three";
import Camera from "../Camera";
import GameScene from "../GameScene";
import Light from "../Light";
import Physic from "../Physic";
import { GameState, SceneState } from "./type";
import { EffekseerContext, EffekseerHandle } from "effekseer";

export default class Game {
  private scene!: THREE.Scene;
  private light!: Light;
  private camera!: Camera;
  private physic!: Physic;
  private renderer!: THREE.WebGLRenderer;
  private canvas!: HTMLCanvasElement;
  private uiContainer!: HTMLDivElement;
  private clock!: THREE.Clock;
  private socket?: GameScene;
  private gameSceneList: (typeof GameScene)[];
  private state: GameState = GameState.BUILD;
  private effekseerContext!: EffekseerContext;
  private effekseerHandle!: EffekseerHandle;

  constructor(params: { scenes: (typeof GameScene)[] }) {
    this.gameSceneList = params.scenes;

    this.build();
    this.loop();
  }

  private build(): void {
    if (this.state !== GameState.BUILD) return;

    this.clock = new THREE.Clock();

    this.canvas = document.createElement("canvas");
    this.canvas.id = "gameLayer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";

    this.uiContainer = document.createElement("div");
    this.uiContainer.id = "ui-container";
    this.uiContainer.style.position = "absolute";
    this.uiContainer.style.top = "0";
    this.uiContainer.style.left = "0";
    this.uiContainer.style.width = "100%";
    this.uiContainer.style.height = "100%";
    this.uiContainer.style.pointerEvents = "none";

    document.body.appendChild(this.canvas);
    document.body.appendChild(this.uiContainer);

    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.physic = new Physic();
    this.effekseerContext = effekseer.createContext();

    if (!this.effekseerContext) {
      console.error("Failed to create Effekseer context");
      return;
    }

    if (this.gameSceneList.length > 0) {
      this.socket = new this.gameSceneList[0](this.scene, this.physic.world);
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    });

    this.effekseerContext.init(this.renderer.getContext());

    const effect = this.effekseerContext.loadEffect(
      "/assets/effects/Laser01.efkefc",
      1.0,
      () => {
        this.effekseerHandle = this.effekseerContext.play(effect, 0, 0, 0);

        if (this.effekseerHandle) {
          this.effekseerHandle.setScale(1, 1, 1);
        } else {
          console.error("Handle is undefined");
        }
      }
    );

    this.effekseerHandle = this.effekseerContext.play(effect, 0, 0, 0);

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.light.light);

    this.state = GameState.RUNNING;
  }

  async loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (this.state !== GameState.RUNNING) return;

    const delta = this.clock.getDelta();

    this.renderer.state.reset();

    this.physic.update(delta);

    this.effekseerContext.update();

    this.effekseerContext.setProjectionMatrix(
      this.camera.camera.projectionMatrix.elements as any
    );

    this.effekseerContext.setCameraMatrix(
      this.camera.camera.matrixWorldInverse.elements as any
    );

    this.effekseerContext.draw();

    if (this.effekseerHandle) {
      console.log("Effect active:", this.effekseerHandle.exists);
    }

    this.renderer.render(this.scene, this.camera.camera);

    if (this.socket) {
      switch (this.socket.state) {
        case SceneState.PRELOAD:
          await this.socket.tunnelPreload();
          break;

        case SceneState.CREATE:
          await this.socket.tunnelCreate();
          break;

        case SceneState.UPDATE:
          this.socket.tunnelUpdate(delta);
          break;
      }
    }
  }
}
