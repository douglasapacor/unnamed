import { Scene } from "phaser";
import Core from "src/utils/Core";

export default class MainScenes extends Scene {
  private core: Core = new Core();

  constructor() {
    super("MainScene");
  }

  preload(): void {}

  create() {
    this.core.init();
  }

  update() {
    this.core.render();
  }
}
