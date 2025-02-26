import { Vec3 } from "cannon-es";
import { Vector3 } from "three";
import Actor from "../lib/Actor";
import Player from "../lib/Player";

export class ExempleOne extends Actor {
  private inCombat: boolean = false;
  private detectionRange: number = 10;
  private attackRange: number = 1;
  private speed: number = 20;
  private attackCooldown: number = 0;
  private maxCooldown: number = 1;

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

  private behaviour(player: Player, delta: number): void {
    if (!player.body) return;
    if (!this.body) return;

    const playerPos = new Vector3().copy(player.body.position);
    const mobPos = new Vector3().copy(this.body.position);
    const distanceToPlayer = mobPos.distanceTo(playerPos);

    this.attackCooldown = Math.max(0, this.attackCooldown - delta);

    if (this.inCombat) {
      if (distanceToPlayer >= 20) {
        this.inCombat = false;
        return;
      }

      if (distanceToPlayer <= this.attackRange) {
        if (this.attackCooldown <= 0) {
          this.attack(player);
          this.playAnimation("punch_002");
        } else {
          // ToDo - idle_attack
          this.playAnimation("idle_001");
        }
      } else {
        this.chase(new Vector3().copy(player.body.position));
        this.playAnimation("running");
      }
    } else {
      if (distanceToPlayer <= this.detectionRange) {
        this.inCombat = true;
        return;
      } else {
        this.playAnimation("idle_001");
      }
    }
  }

  public update(player: Player, delta: number): void {
    super.update(player, delta);
    this.behaviour(player, delta);
  }
}
