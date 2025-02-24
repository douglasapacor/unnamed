import { Vector3 } from "three";
import Actor from "../lib/Actor";
import { Vec3 } from "cannon-es";

enum actorMoves {
  PUNCH_001,
  PUNCH_002,
  RUNNING,
  IDDLE,
}

export class ExempleOne extends Actor {
  state: actorMoves = actorMoves.IDDLE;
  detectionRange: number = 5; // Raio de detecção
  attackRange: number = 1; // Distância para atacar
  speed: number = 2; // Velocidade de perseguição
  attackCooldown: number = 0; // Tempo entre ataques (em segundos)
  maxCooldown: number = 1; // 1 segundo entre ataques

  public preload(): void {
    super.preload();
  }

  public update(delta: number): void {
    super.update(delta);
  }

  chase(targetPos: Vector3) {
    const direction = targetPos.clone().sub(this.body.position).normalize();
    this.body.velocity.set(
      direction.x * this.speed,
      this.body.velocity.y, // Mantém a gravidade
      direction.z * this.speed
    );
  }

  attack(target: any) {
    console.log("Mob ataca o jogador!");
    this.attackCooldown = this.maxCooldown; // Reseta o cooldown

    // Impulso físico para simular o "soco"
    const knockback = new Vec3(2, 0, 2);
    target.body.applyImpulse(knockback, target.body.position);
  }
}
