import { Scene } from "phaser";
import { MODELS } from "../config/directories";
import Core from "../utils/Core";
import InputController from "../utils/InputController";
import Player from "../utils/Player";
import Terrain from "../utils/Terrain";

export default class MainScenes extends Scene {
  private core: Core;
  private terrain: Terrain;
  private player: Player;
  private inputController: InputController;

  constructor() {
    super("MainScene");
    this.core = new Core();
  }

  preload(): void {
    this.core.init();
    this.terrain = new Terrain(this.core.scene, this.core.physics.world);
    this.player = new Player(
      this.core.scene,
      this.core.physics.world,
      MODELS.dummy
    );

    this.inputController = new InputController(this);
  }

  create(): void {
    this.player.create();
    this.inputController.create();
    this.inputController.left = this.player_left;
    this.inputController.right = this.player_right;
    this.inputController.up = this.player_up;
    this.inputController.down = this.player_down;
  }

  update(t: number, delta: number) {
    this.core.render();
    this.terrain.update();
    this.player.update(delta);
    this.inputController.update();
  }

  private player_left = () => {
    this.player.body.velocity.z += this.player.attributes.speed;
  };

  private player_right = () => {
    this.player.body.velocity.x += this.player.attributes.speed;
  };

  private player_up = () => {
    this.player.body.velocity.z -= this.player.attributes.speed;
  };

  private player_down = () => {
    this.player.body.velocity.x -= this.player.attributes.speed;
  };
}
