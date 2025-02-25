import { Vec3 } from "cannon-es";
import { Vector3 } from "three";
import Actor from "../lib/Actor";
import Player from "../lib/Player";

enum states {
  IDLE,
  CHASE,
  ATTACK,
  ATTACK_COLDOWN,
}

export class ExempleOne extends Actor {
  private state: states = states.IDLE;
  private detectionRange: number = 25;
  private attackRange: number = 1;
  private speed: number = 20;
  private attackCooldown: number = 0;
  private maxCooldown: number = 1;

  private behaviour(player: Player, delta: number): void {
    if (!player.body) return;
    if (!this.body) return;

    const playerPos = new Vector3().copy(player.body.position);
    const mobPos = new Vector3().copy(this.body.position);
    const distanceToPlayer = mobPos.distanceTo(playerPos);

    this.attackCooldown = Math.max(0, this.attackCooldown - delta);

    switch (this.state) {
      case states.IDLE:
        if (distanceToPlayer <= this.detectionRange) {
          this.state = states.CHASE;
        }
        break;
      case states.CHASE:
        break;
      case states.ATTACK:
        break;
      case states.ATTACK_COLDOWN:
        break;
    }
  }

  public update(player: Player, delta: number): void {
    super.update(player, delta);
    this.behaviour(player, delta);
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
