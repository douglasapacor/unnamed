import { Vec3 } from "cannon-es";
import { ExempleOne } from "../actors/ExempleOne";
import { dummy, enemy } from "../directories";
import { HealthBar } from "../GUI/HealthBar";
import GameScene from "../lib/GameScene";
import { InputController } from "../lib/InputController";
import Player from "../lib/Player";
import Terrain from "../lib/Terrain";
import { UIManager } from "../lib/UI/UIManager/UIManager";

export default class MainScene extends GameScene {
  private terrain!: Terrain;
  private player!: Player;
  private uimanager: UIManager = new UIManager();

  public override preload(): void {
    this.terrain = new Terrain({ scene: this.scene, world: this.world });
    this.player = new Player({
      name: "player",
      model: dummy,
      scene: this.scene,
      world: this.world,
      position: new Vec3(0, -3, 0),
    });
    this.player.preload();
    this.uimanager.addComponent(new HealthBar("health-bar"), "health-bar");
  }

  public override create(): void {
    new InputController(this.player);

    this.actors.push(
      new ExempleOne({
        model: enemy,
        name: "inimigo",
        scene: this.scene,
        world: this.world,
        position: new Vec3(10, -3, 10),
      })
    );
  }

  public override update(delta: number): void {
    this.terrain.update(delta);
    this.player.update(delta);
    this.uimanager.update(delta);
    this.actors.forEach((actor) => {
      actor.update(this.player, delta);
    });
  }
}
