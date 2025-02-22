import { Vector3 } from "three";
import { cameraEvents } from "../../helpers/all-events";
import Attributes from "../Attributes";
import Entity from "../Entity";
import Life from "../Life";

export default class Player extends Entity {
  public life!: Life;
  public attributes!: Attributes;

  public preload() {
    super.preload();
    this.life = new Life();
    this.attributes = new Attributes();
  }

  public update(delta: number) {
    super.update(delta);

    if (!this.isReady) return;

    if (this.moves.left) this.playAnimation("running_001");
    if (this.moves.right) this.playAnimation("running_001");
    if (this.moves.up) this.playAnimation("running_001");
    if (this.moves.down) this.playAnimation("running_001");
    if (this.moves.idle) this.playAnimation("idle_001");

    cameraEvents.emit({
      name: "camera_focus",
      value: new Vector3(
        this.body.position.x,
        this.body.position.y,
        this.body.position.z
      ),
    });
  }
}
