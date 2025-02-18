import * as THREE from "three";
import Camera from "../Camera";
import GameScene from "../GameScene";
import Light from "../Light";
import Physic from "../Physic";
import { GameState, SceneState } from "./type";

export default class Game {
  private scene: THREE.Scene;
  private light: Light;
  private camera: Camera;
  private physic: Physic;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private clock: THREE.Clock;
  private socket?: GameScene;
  private gameSceneList: (typeof GameScene)[];
  private state: GameState = GameState.BUILD;

  constructor(params: { scenes: (typeof GameScene)[] }) {
    this.gameSceneList = params.scenes;

    this.build();
    this.loop();
  }

  async loop() {
    console.log("Loop rodando...");
    requestAnimationFrame(this.loop.bind(this));
    if (this.state !== GameState.RUNNING) return;

    const delta = this.clock.getDelta();

    this.physic.update(delta);
    this.renderer.state.reset();
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

  private build(): void {
    if (this.state !== GameState.BUILD) return;

    this.clock = new THREE.Clock();

    this.canvas = document.createElement("canvas");
    this.canvas.id = "3D_layer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";

    document.body.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.physic = new Physic();

    if (this.gameSceneList.length > 0) {
      this.socket = new this.gameSceneList[0](this.scene, this.physic.world);
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.light.light);
    this.state = GameState.RUNNING;
  }
}
