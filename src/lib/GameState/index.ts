import { Vector3 } from "three";
import { Event } from "../Event";
import { onEvent } from "../Event/type";

class GameState {
  private events: Event;
  public player: { health: number; maxHealth: number; position: Vector3 };

  constructor() {
    this.events = new Event();
    this.player = {
      health: 100,
      maxHealth: 100,
      position: new Vector3(0, 1, 0),
    };
  }

  public updatePlayerPosition(position: Vector3) {
    this.player.position = position.clone();
    this.events.emit({
      name: "playerPositionChanged",
      value: this.player.position,
    });
  }

  public updatePlayerHealth(health: number) {
    this.player.health = Math.max(0, Math.min(health, this.player.maxHealth));
    this.events.emit({
      name: "playerHealthChanged",
      value: this.player.health,
    });
  }

  public on(event: onEvent): number {
    return this.events.on(event);
  }

  public off(id: number): void {
    this.events.off(id);
  }
}

const gameState = new GameState();
export default gameState;
