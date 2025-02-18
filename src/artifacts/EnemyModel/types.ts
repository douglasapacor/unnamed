import * as CANNON from "cannon-es";
import * as THREE from "three";

export type enemyModelContructor = {
  scene: THREE.Scene;
  world: CANNON.World;
  position?: CANNON.Vec3;
};
