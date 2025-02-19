export default class Attributes {
  private _strength: number;
  private _intelligence: number;
  private _dexterity: number;
  private _baseMovespeed: number;

  constructor() {
    this._strength = 10;
    this._intelligence = 10;
    this._dexterity = 10;
    this._baseMovespeed = 20 + this._strength * 0.5 + this._dexterity * 0.5;
  }

  get strength(): number {
    return this._strength;
  }
  get intelligence(): number {
    return this._intelligence;
  }
  get dexterity(): number {
    return this._dexterity;
  }
  get movespeed(): number {
    return this._baseMovespeed;
  }
}
