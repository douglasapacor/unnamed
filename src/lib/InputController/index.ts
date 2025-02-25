import { InputManager } from "../InputManager";
import { InputHandler } from "../InputManager/type";
import Player from "../Player";

export class InputController implements InputHandler {
  constructor(private player: Player) {
    InputManager.instance.subscribe(this.onInput.bind(this));
  }

  public onInput(key: string, state: boolean): void {
    switch (key) {
      case "KeyA":
        state
          ? this.player.walkLeftOn(this.player.attributes.movespeed)
          : this.player.walkLeftOff();
        break;
      case "KeyD":
        state
          ? this.player.walkRightOn(this.player.attributes.movespeed)
          : this.player.walkRightOff();
        break;
      case "KeyW":
        state
          ? this.player.walkUpOn(this.player.attributes.movespeed)
          : this.player.walkUpOff();
        break;
      case "KeyS":
        state
          ? this.player.walkDownOn(this.player.attributes.movespeed)
          : this.player.walkDownOff();
        break;
    }
  }

  public destroy(): void {
    InputManager.instance.unsubscribe(this.onInput.bind(this));
  }
}
