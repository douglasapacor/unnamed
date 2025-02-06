export class Attributes {
  private _speed: number;

  constructor(speed: number = 5) {
    this._speed = speed;
  }

  get speed(): number {
    return this._speed;
  }
}
