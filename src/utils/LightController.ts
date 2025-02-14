import * as THREE from "three";

export default class LightController {
  public light: THREE.DirectionalLight;

  constructor() {
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(1, 1, 1).normalize();
  }
}
