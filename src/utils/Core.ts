import * as THREE from "three";
export default class Core {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private light: THREE.DirectionalLight;
  private canvas: HTMLCanvasElement;

  constructor() {}

  set _scene(value: THREE.Scene) {
    this.scene = value;
  }

  get _scene(): THREE.Scene {
    return this.scene;
  }

  get _camera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  get _light(): THREE.DirectionalLight {
    return this.light;
  }

  public init() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "3D_layer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";
    document.body.appendChild(this.canvas);

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

    this.camera.position.x = 0;
    this.camera.position.y = 5;
    this.camera.position.z = 5;
    this.camera.rotation.x = 50;

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(1, 1, 1).normalize();
    this.scene.add(this.light);
  }

  public render() {
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
  }
}
