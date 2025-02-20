import { Vector3 } from "three";
import { cameraEvents } from "../../helpers/events";
import Attributes from "../Attributes";
import { Collider } from "../Collider";
import Entity from "../Entity";
import Life from "../Life";

export default class Player extends Entity {
  public life: Life;
  public attributes: Attributes;
  public aggro: Collider;

  public preload() {
    super.preload();
    this.life = new Life();
    this.attributes = new Attributes();
    this.aggro = new Collider({
      name: "player_collider",
      radius: 5,
      scene: this.params.scene,
      world: this.params.world,
      collisionResponse: false,
      ignore: [this.params.name],
    });
    this.aggro.preload();
  }

  public update(delta: number) {
    super.update(delta);

    if (!this.isReady) return;

    this.aggro.update();
    this.aggro.attach(this.body.position);

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
