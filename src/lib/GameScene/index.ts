import * as CANNON from "cannon-es";
import * as THREE from "three";
import { SceneState } from "./type";

export default class GameScene {
  private _state: SceneState = SceneState.PRELOAD;

  constructor(protected scene: THREE.Scene, protected world: CANNON.World) {}

  public get state(): SceneState {
    return this._state;
  }

  public async tunnelPreload(): Promise<void> {
    if (this._state !== SceneState.PRELOAD) return;

    this.preload();
    this._state = SceneState.CREATE;
  }

  public async tunnelCreate(): Promise<void> {
    if (this._state !== SceneState.CREATE) return;

    this.create();
    this._state = SceneState.UPDATE;
  }

  public async tunnelUpdate(delta: number): Promise<void> {
    if (this._state !== SceneState.UPDATE) return;

    this.update(delta);
  }

  public preload() {}

  public create() {}

  public update(delta: number) {}
}
