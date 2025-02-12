import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    path: string;
  }) {
    super({
      scene: params.scene,
      path: params.path,
      world: params.world,
    });
  }

  public update(delta: number): void {
    super.update(delta);

    if (this.loaded) {
      cameraEvents.emit("player_position", this.body.position);
    }
  }
}
