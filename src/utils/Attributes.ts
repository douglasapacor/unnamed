export class Attributes {
  private _speed: number;
  private _jump_force: number;

  constructor() {
    this._speed = 10;
    this._jump_force = 10;
  }

  get speed(): number {
    return this._speed;
  }

  get jumpForce(): number {
    return this._jump_force;
  }
}
