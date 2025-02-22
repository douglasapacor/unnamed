import Actor from "../lib/Actor";
import { Collider } from "../lib/Collider";

enum actorMoves {
  PUNCH_001,
  PUNCH_002,
  RUNNING,
  IDDLE,
}

export class ExempleOne extends Actor {
  private aggro!: Collider;
  private moves: actorMoves = actorMoves.IDDLE;

  //   private chase(): void {
  //     if (!this.isReady) return;
  //     if (!this.target) return;

  //     const thisPosition = new Vector3(
  //       this.body.position.x,
  //       this.body.position.y,
  //       this.body.position.z
  //     );

  //     const targetPos = new Vector3(this.target.x, this.target.y, this.target.z);

  //     const direction = new Vector3()
  //       .subVectors(targetPos, thisPosition)
  //       .setY(0)
  //       .normalize();

  //     this.body.velocity.set(
  //       direction.x * 26,
  //       this.body.velocity.y,
  //       direction.z * 26
  //     );

  //     const targetRotation = Math.atan2(direction.x, direction.z);

  //     this.model.rotation.y = MathUtils.lerp(
  //       this.model.rotation.y,
  //       targetRotation,
  //       1
  //     );
  //   }

  public preload(): void {
    super.preload();
    this.aggro = new Collider({
      name: `${this.params.name}-aggro`,
      collisionResponse: false,
      radius: 5,
      scene: this.params.scene,
      world: this.params.world,
      ignore: [this.params.name],
      position: this.params.position,
      debug: true,
      color: 0xf44336,
    });
    this.aggro.onCollide = this.onCollide;
    this.aggro.preload();
  }

  private onCollide = (event: any) => {
    if (event.body.name === "player") {
    }
  };

  public update(delta: number): void {
    super.update(delta);

    if (this.isReady) {
      this.aggro.attach(this.body.position);
      this.aggro.update();

      if (this.moves === actorMoves.IDDLE) this.playAnimation("idle_001");
      if (this.moves === actorMoves.PUNCH_001) this.playAnimation("punch_001");
      if (this.moves === actorMoves.PUNCH_002) this.playAnimation("punch_002");
      if (this.moves === actorMoves.RUNNING) this.playAnimation("running");
    }
  }
}
