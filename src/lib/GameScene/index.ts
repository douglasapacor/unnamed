import * as CANNON from "cannon-es";
import * as THREE from "three";
import Actor from "../Actor";
import { SceneState } from "./type";

export default class GameScene {
  private _state: SceneState = SceneState.PRELOAD;
  public actors: Array<Actor> = [];

  constructor(protected scene: THREE.Scene, protected world: CANNON.World) {}

  get state(): SceneState {
    return this._state;
  }

  async tunnelPreload(): Promise<void> {
    if (this._state !== SceneState.PRELOAD) return;

    this.preload();
    this._state = SceneState.CREATE;
  }

  async tunnelCreate(): Promise<void> {
    if (this._state !== SceneState.CREATE) return;

    this.create();
    this._state = SceneState.UPDATE;
  }

  async tunnelUpdate(delta: number): Promise<void> {
    if (this._state !== SceneState.UPDATE) return;

    this.update(delta);
  }

  preload() {}
  create() {}
  update(delta: number) {}
}
