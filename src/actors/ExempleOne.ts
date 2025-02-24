import { Vec3 } from "cannon-es";
import { Vector3 } from "three";
import { generateRandomRangeNumber } from "../helpers/random";
import Actor from "../lib/Actor";
import Player from "../lib/Player";

enum states {
  IDLE,
  CHASING,
  ATTACKING,
}

export class ExempleOne extends Actor {
  private state: states = states.IDLE;
  private detectionRange: number = 25;
  private attackRange: number = 1;
  private speed: number = 20;
  private attackCooldown: number = 0;
  private maxCooldown: number = 1;

  public update(player: Player, delta: number): void {
    super.update(player, delta);

    if (!player.body) return;
    if (!this.body) return;

    const playerPos = new Vector3().copy(player.body.position);
    const mobPos = new Vector3().copy(this.body.position);
    const distanceToPlayer = mobPos.distanceTo(playerPos);

    this.attackCooldown = Math.max(0, this.attackCooldown - delta);

    switch (this.state) {
      case states.IDLE:
        if (distanceToPlayer <= this.detectionRange) {
          this.state = states.CHASING;
          this.playAnimation("running");
        } else this.playAnimation("idle_001");
        break;
      case states.CHASING:
        if (distanceToPlayer <= this.attackRange && this.attackCooldown === 0) {
          this.state = states.ATTACKING;
          this.attack(player);
          const hit = generateRandomRangeNumber(1, 3);
          switch (hit) {
            case 1:
              this.playAnimation("punch_001");
              break;
            case 2:
              this.playAnimation("punch_002");
              break;
          }
        } else if (distanceToPlayer > this.detectionRange) {
          this.state = states.IDLE;
          this.body.velocity.set(0, this.body.velocity.y, 0);

          this.playAnimation("idle_001");
        } else {
          this.chase(playerPos);
        }

        break;
      case states.ATTACKING:
        if (this.attackCooldown === 0) {
          this.state = states.CHASING;
        }

        break;
    }
  }

  private chase(targetPosition: Vector3) {
    const direction = targetPosition
      .clone()
      .sub(this.body.position)
      .normalize();

    this.body.velocity.set(
      direction.x * this.speed,
      this.body.velocity.y,
      direction.z * this.speed
    );
  }

  private attack(player: Player) {
    this.attackCooldown = this.maxCooldown;
    player.body.applyImpulse(new Vec3(2, 0, 2), player.body.position);
  }
}
