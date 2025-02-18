import * as THREE from "three";
import CameraController from "./CameraController ";
import LightController from "./LightController";
import PhysicController from "./PhysicController";

export default class Core {
  public scene: THREE.Scene;
  public lightController: LightController;
  public cameraController: CameraController;
  public physicsController: PhysicController;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "3D_layer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";

    document.body.appendChild(this.canvas);

    this.cameraController = new CameraController();
    this.lightController = new LightController();
    this.physicsController = new PhysicController();

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.lightController.light);
  }

  update(delta: number): void {
    this.physicsController.update(delta);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.cameraController.camera);
  }
}
