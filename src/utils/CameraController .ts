import * as THREE from "three";
import { cameraEvents } from "../helpers/events";

export default class CameraController {
  private zoomSpeed: number = 2;
  private minZoom: number = 1;
  private maxZoom: number = 30;
  private distanceX: number = 0;
  private distanceY: number = 5;
  private distanceZ: number = 15;
  private offset: THREE.Vector3;
  public camera: THREE.PerspectiveCamera;

  constructor() {
    window.addEventListener("wheel", this.onMouseWheel.bind(this));

    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    cameraEvents.on("player_position", this, (position: THREE.Vector3) => {
      this.offset = new THREE.Vector3(
        this.distanceX,
        this.distanceY,
        this.distanceZ
      );

      this.camera.position.copy(position.add(this.offset));

      this.camera.lookAt(position);
    });
  }

  private onMouseWheel(event: WheelEvent) {
    this.distanceZ += event.deltaY * 0.01 * this.zoomSpeed;

    if (this.distanceZ <= 6.4) this.distanceY = 1;
    if (this.distanceZ > 6.4 && this.distanceZ <= 12.8) this.distanceY = 2;
    if (this.distanceZ > 12.8 && this.distanceZ <= 19.2) this.distanceY = 3;
    if (this.distanceZ > 19.2 && this.distanceZ <= 25.6) this.distanceY = 4;
    if (this.distanceZ > 25.6 && this.distanceZ <= 32) this.distanceY = 5;

    this.distanceZ = THREE.MathUtils.clamp(
      this.distanceZ,
      this.minZoom,
      this.maxZoom
    );
  }
}
