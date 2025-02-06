import { Scene } from "phaser";
export default class InputController {
  private keys: {
    W: Phaser.Input.Keyboard.Key | null;
    A: Phaser.Input.Keyboard.Key | null;
    S: Phaser.Input.Keyboard.Key | null;
    D: Phaser.Input.Keyboard.Key | null;
  } = {
    W: null,
    A: null,
    S: null,
    D: null,
  };

  private actions: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    jumping: boolean;
  } = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    jumping: false,
  };

  public left: Function;
  public right: Function;
  public up: Function;
  public down: Function;

  constructor(private scene: Scene) {
    this.keys.W = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.keys.A = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keys.S = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.keys.D = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
  }

  create(): void {
    this.keys.W.on("down", () => {
      this.actions.up = true;
    });

    this.keys.W.on("up", () => {
      this.actions.up = false;
    });

    this.keys.A.on("down", () => {
      this.actions.down = true;
    });

    this.keys.A.on("up", () => {
      this.actions.down = false;
    });

    this.keys.S.on("down", () => {
      this.actions.left = true;
    });

    this.keys.S.on("up", () => {
      this.actions.left = false;
    });

    this.keys.D.on("down", () => {
      this.actions.right = true;
    });

    this.keys.D.on("up", () => {
      this.actions.right = false;
    });
  }

  update() {
    if (this.actions.left) this.left();
    if (this.actions.right) this.right();
    if (this.actions.up) this.up();
    if (this.actions.down) this.down();
    if (this.actions.jump && !this.actions.jumping) {
    }
  }
}
