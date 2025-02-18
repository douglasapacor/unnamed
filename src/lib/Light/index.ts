import * as THREE from "three";

export default class Light {
  public light: THREE.DirectionalLight;

  constructor() {
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.castShadow = true;
    this.light.position.set(1, 1, 1).normalize();
  }
}
