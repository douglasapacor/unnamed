import * as CANNON from "cannon-es";
import * as THREE from "three";

export interface ECBody extends CANNON.Body {
  name?: string;
}

export interface collider {
  name: string;
  radius: number;
  scene: THREE.Scene;
  world: CANNON.World;
  collisionResponse: boolean;
  debug?: boolean;
  ignore?: string[];
  position?: CANNON.Vec3;
  color?: THREE.ColorRepresentation;
}
