export default class Attributes {
  private _baseMovespeed: number;

  constructor() {
    this._baseMovespeed = 25;
  }

  get movespeed(): number {
    return this._baseMovespeed;
  }
}
