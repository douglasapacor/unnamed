import * as CANNON from "cannon-es";
import * as THREE from "three";
import { cameraEvents } from "../helpers/events";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(
    protected params: {
      scene: THREE.Scene;
      world: CANNON.World;
      input: Phaser.Input.InputPlugin;
      path: string;
      name?: string;
      collider?: boolean;
    }
  ) {
    super({
      path: params.path,
      scene: params.scene,
      world: params.world,
      collider: params.collider,
      name: params.name,
    });
  }

  update(delta: number): void {
    super.update(delta);

    cameraEvents.emit("player_position", this.body.position);
  }
}
