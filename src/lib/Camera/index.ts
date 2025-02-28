import * as THREE from "three";
import { cameraEvents } from "../../global";

export default class Camera {
  public camera: THREE.OrthographicCamera;
  private zoomLevel: number = 10;
  private minZoom: number = 1;
  private maxZoom: number = 10;
  private zoomSpeed: number = 1;
  private canZoom: boolean = true;
  private aspect: number;

  constructor() {
    this.aspect = window.innerWidth / window.innerHeight;

    this.camera = new THREE.OrthographicCamera(
      -this.zoomLevel * this.aspect,
      this.zoomLevel * this.aspect,
      this.zoomLevel,
      -this.zoomLevel,
      0.1,
      1000
    );

    cameraEvents.on({
      name: "camera_focus",
      caller: this,
      callback: (position: THREE.Vector3) => {
        this.camera.position.copy(
          new THREE.Vector3(position.x + 10, position.y + 10, position.z + 10)
        );
        this.camera.lookAt(position);
      },
    });

    window.addEventListener("wheel", this.handleZoom);
  }

  private handleZoom = (event: WheelEvent): void => {
    if (this.canZoom) {
      const delta = event.deltaY > 0 ? this.zoomSpeed : -this.zoomSpeed;

      this.zoomLevel = THREE.MathUtils.clamp(
        this.zoomLevel + delta,
        this.minZoom,
        this.maxZoom
      );

      const aspect = window.innerWidth / window.innerHeight;
      this.camera.left = -this.zoomLevel * aspect;
      this.camera.right = this.zoomLevel * aspect;
      this.camera.top = this.zoomLevel;
      this.camera.bottom = -this.zoomLevel;
      this.camera.updateProjectionMatrix();
    }
  };

  public allowZoom(): void {
    this.canZoom = true;
  }

  public denyZoom(): void {
    this.canZoom = false;
  }

  public toScreenPosition(position: THREE.Vector3) {
    const vector = new THREE.Vector3(position.x, position.y, position.z);

    vector.project(this.camera);

    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    return {
      x: vector.x * widthHalf + widthHalf,
      y: -(vector.y * heightHalf) + heightHalf,
    };
  }
}
