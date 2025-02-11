import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(params: {
    scene: THREE.Scene;
    world: CANNON.World;
    input: Phaser.Input.InputPlugin;
    path: string;
    name?: string;
    debug?: boolean;
  }) {
    super({
      path: params.path,
      scene: params.scene,
      world: params.world,
      debug: params.debug,
    });
  }

  public update(delta: number): void {
    super.update(delta);

    cameraEvents.emit("player_position", this.body.position);
  }
}
