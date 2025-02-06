import { Scene } from "phaser";
export default class KeyboardScene {
  private W_key: Phaser.Input.Keyboard.Key;
  private A_key: Phaser.Input.Keyboard.Key;
  private S_key: Phaser.Input.Keyboard.Key;
  private D_key: Phaser.Input.Keyboard.Key;
  public w_pressed: boolean;
  public a_pressed: boolean;
  public s_pressed: boolean;
  public d_pressed: boolean;

  constructor(private scene: Scene) {
    this.w_pressed = false;
    this.a_pressed = false;
    this.s_pressed = false;
    this.d_pressed = false;
  }

  create(): void {
    this.W_key = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.A_key = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.S_key = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.D_key = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    this.W_key.on("down", () => {
      this.w_pressed = true;
    });
    this.W_key.on("up", () => {
      this.w_pressed = false;
    });

    this.A_key.on("down", () => {
      this.a_pressed = true;
    });
    this.A_key.on("up", () => {
      this.a_pressed = false;
    });

    this.S_key.on("down", () => {
      this.s_pressed = true;
    });
    this.S_key.on("up", () => {
      this.s_pressed = false;
    });

    this.D_key.on("down", () => {
      this.d_pressed = true;
    });
    this.D_key.on("up", () => {
      this.d_pressed = false;
    });
  }
}
