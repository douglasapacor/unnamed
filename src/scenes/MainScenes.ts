import { Scene } from "phaser";
import ThreeManager from "../utils/ThreeManager";

export default class MainScenes extends Scene {
  private threeManager!: ThreeManager;

  constructor() {
    super("MainScene");
    this.threeManager = new ThreeManager("main");
  }

  preload(): void {}

  create() {
    this.threeManager.init();
    this.add.text(10, 10, "UI layer", { color: "#ffffff" });
  }

  update() {
    if (this.threeManager) this.threeManager.render();
  }
}
