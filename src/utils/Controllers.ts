export default class Controllers {
  private w: Phaser.Input.Keyboard.Key;
  private a: Phaser.Input.Keyboard.Key;
  private s: Phaser.Input.Keyboard.Key;
  private d: Phaser.Input.Keyboard.Key;

  constructor(private input: Phaser.Input.InputPlugin) {
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  create() {
    this.w.on("down", this.w_down);
    this.w.on("up", this.w_up);

    this.a.on("down", this.a_down);
    this.a.on("up", this.a_up);

    this.s.on("down", this.s_down);
    this.s.on("up", this.s_up);

    this.d.on("down", this.d_down);
    this.d.on("up", this.d_up);
  }

  public w_up() {}
  public w_down() {}

  public a_up() {}
  public a_down() {}

  public s_up() {}
  public s_down() {}

  public d_up() {}
  public d_down() {}
}
