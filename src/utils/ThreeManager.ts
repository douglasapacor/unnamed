import * as THREE from "three";

export default class ThreeManager {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private light!: THREE.DirectionalLight;
  private cube!: THREE.Mesh;
  private canvas!: HTMLCanvasElement;

  constructor(private parentElementId: string) {}

  init() {
    this.canvas = document.createElement("canvas");

    this.canvas.id = "game_layer";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";

    document.getElementById(this.parentElementId)?.appendChild(this.canvas);

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

    this.camera.position.z = 1;

    this.light = new THREE.DirectionalLight(0xffffff, 1);

    this.light.position.set(1, 1, 1).normalize();

    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
  }

  render() {
    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
