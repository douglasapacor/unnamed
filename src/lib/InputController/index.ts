import { InputManager } from "../InputManager";
import { InputHandler } from "../InputManager/type";
import Player from "../Player";

export class InputController implements InputHandler {
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
    InputManager.instance.subscribe(this.onInput.bind(this));
  }

  public onInput(key: string, state: boolean): void {
    switch (key) {
      case "KeyA":
        state
          ? this._player.walkLeftOn(this._player.attributes.movespeed)
          : this._player.walkLeftOff();
        break;
      case "KeyD":
        state
          ? this._player.walkRightOn(this._player.attributes.movespeed)
          : this._player.walkRightOff();
        break;
      case "KeyW":
        state
          ? this._player.walkUpOn(this._player.attributes.movespeed)
          : this._player.walkUpOff();
        break;
      case "KeyS":
        state
          ? this._player.walkDownOn(this._player.attributes.movespeed)
          : this._player.walkDownOff();
        break;
    }
  }

  public destroy(): void {
    InputManager.instance.unsubscribe(this.onInput.bind(this));
  }
}
