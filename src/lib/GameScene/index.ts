import { World } from "cannon-es";
import { Scene } from "three";
import { SceneState } from "./type";

export default class GameScene {
  private _state: SceneState = SceneState.PRELOAD;

  constructor(protected scene: Scene, protected world: World) {}

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

  public preload() {}
  public create() {}
  public update(delta: number) {}
}
