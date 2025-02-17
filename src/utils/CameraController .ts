import * as THREE from "three";
import { cameraEvents } from "../helpers/events";

export default class CameraController {
  public camera: THREE.OrthographicCamera;
  private zoomLevel: number = 10;
  private minZoom: number = 1;
  private maxZoom: number = 10;
  private zoomSpeed: number = 1;
  private canZoom: boolean = true;

  constructor() {
    const aspect = window.innerWidth / window.innerHeight;

    this.camera = new THREE.OrthographicCamera(
      -this.zoomLevel * aspect,
      this.zoomLevel * aspect,
      this.zoomLevel,
      -this.zoomLevel,
      0.1,
      1000
    );

    cameraEvents.on("player_position", this, (position: THREE.Vector3) => {
      this.updateCameraPosition(position);
    });

    window.addEventListener("wheel", this.handleZoom);
  }

  private updateCameraPosition(position: THREE.Vector3): void {
    this.camera.position.set(position.x + 10, position.y + 10, position.z + 10);
    this.camera.lookAt(position);
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
}
