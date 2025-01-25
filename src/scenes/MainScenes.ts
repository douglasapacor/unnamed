import { Scene, Time } from "phaser";
import Core from "../utils/Core";
import Entity from "../utils/Entity";
import * as THREE from "three";

export default class MainScenes extends Scene {
  private core: Core = new Core();

  private camOut: Phaser.Input.Keyboard.Key;
  private camIn: Phaser.Input.Keyboard.Key;

  private left: Phaser.Input.Keyboard.Key;
  private rigth: Phaser.Input.Keyboard.Key;

  private up: Phaser.Input.Keyboard.Key;
  private down: Phaser.Input.Keyboard.Key;

  private rotateUp: Phaser.Input.Keyboard.Key;
  private rotateDown: Phaser.Input.Keyboard.Key;

  private walk: Phaser.Input.Keyboard.Key;

  private ground!: THREE.Mesh;
  private char: Entity;

  constructor() {
    super("MainScene");
  }

  preload(): void {
    this.core.init();

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rigth = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    this.rotateUp = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.O
    );

    this.rotateDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L
    );

    this.walk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.camOut = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.MINUS
    );

    this.camIn = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.PLUS
    );

    this.walk.on("down", () => {
      this.char.playAnimation("walk");
    });

    this.camOut.on("down", () => {
      this.core._camera.position.z += 1;
    });

    this.camIn.on("down", () => {
      this.core._camera.position.z -= 1;
    });

    this.left.on("down", () => {
      this.core._camera.position.x -= 1;
    });

    this.rigth.on("down", () => {
      this.core._camera.position.x += 1;
    });

    this.up.on("down", () => {
      this.core._camera.position.y -= 1;
    });

    this.down.on("down", () => {
      this.core._camera.position.y += 1;
    });

    this.rotateUp.on("down", () => {
      this.core._camera.rotation.x += 50;
    });

    this.rotateDown.on("down", () => {
      this.core._camera.rotation.x -= 50;
    });
  }

  create() {
    this.char = new Entity(this.core._scene, "/src/assets/models/tst.glb", 1);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);

    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.core._scene.add(this.ground);

    this.add.text(
      10,
      10,
      `position: ${JSON.stringify(this.core._camera.position)}`,
      {
        color: "#ffffff",
      }
    );
  }

  update(t: number, delta: number) {
    this.core.render();
    this.char.update(delta);
  }
}
