import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import DebugRenderer from "./DebugRenderer";
import Physic from "./Physic";

export default class Core {
  public scene: THREE.Scene;
  public light: THREE.DirectionalLight;
  public camera: THREE.PerspectiveCamera;
  public physics: Physic;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private debugRenderer: DebugRenderer;

  constructor(private debug?: boolean) {
    cameraEvents.on(
      "player_position",
      this,
      (position: { x: number; y: number; z: number }) => {
        this.camera.position.lerp(
          new THREE.Vector3(position.x, position.y + 2, position.z + 6),
          0.5
        );
      }
    );

    this.canvas = document.createElement("canvas");
    this.canvas.id = "3D_layer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";

    document.body.appendChild(this.canvas);

    this.physics = new Physic();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(1, 1, 1).normalize();

    this.scene.add(this.light);

    if (this.debug) {
      this.debugRenderer = new DebugRenderer(
        this.scene,
        this.physics.world,
        {}
      );
    }
  }

  update(delta: number): void {
    if (this.debug) this.debugRenderer.update();

    this.physics.update(delta);

    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
  }
}
