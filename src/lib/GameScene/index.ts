import * as CANNON from "cannon-es";
import * as THREE from "three";
import { actor, SceneState } from "./type";

export default class GameScene {
  private _state: SceneState = SceneState.PRELOAD;
  private _actors: Array<actor> = [];

  constructor(protected scene: THREE.Scene, protected world: CANNON.World) {}

  get state(): SceneState {
    return this._state;
  }

  async tunnelPreload(): Promise<void> {
    if (this._state !== SceneState.PRELOAD) return;

    this.preload();
    this._actors.forEach((actor) => {
      if (actor.preload) actor.preload();
    });

    this._state = SceneState.CREATE;
  }

  async tunnelCreate(): Promise<void> {
    if (this._state !== SceneState.CREATE) return;

    this.create();
    this._actors.forEach((actor) => {
      if (actor.create) actor.create();
    });

    this._state = SceneState.UPDATE;
  }

  public async tunnelUpdate(delta: number): Promise<void> {
    if (this._state !== SceneState.UPDATE) return;

    this.update(delta);
    this._actors.forEach((actor) => {
      if (actor.update) actor.update(delta);
    });
  }

  preload() {}

  create() {}

  update(delta: number) {}

  addActor(actor: actor): void {
    this._actors.push(actor);
  }
}
