export default class Attributes {
  private _strength: number;
  private _intelligence: number;
  private _dexterity: number;
  private _movespeed: number;

  constructor(params?: {
    strength?: number;
    intelligence?: number;
    dexterity?: number;
  }) {
    if (params && params.strength) {
      this._strength = params.strength;
    } else {
      this._strength = 5;
    }

    if (params && params.intelligence) {
      this._intelligence = params.intelligence;
    } else {
      this._intelligence = 5;
    }

    if (params && params.dexterity) {
      this._dexterity = params.dexterity;
    } else {
      this._dexterity = 5;
    }

    const base = 25;
    const dexterityAddition = this._dexterity * 0.4;
    const strengthAddition = this._strength * 0.2;

    this._movespeed = base + dexterityAddition + strengthAddition;
  }

  get strength(): number {
    return this._strength;
  }
  set strength(value: number) {
    this._strength = value;
  }

  get intelligence(): number {
    return this._intelligence;
  }
  set intelligence(value: number) {
    this._intelligence = value;
  }

  get dexterity() {
    return this._dexterity;
  }
  set dexterity(value: number) {
    this._dexterity = value;
  }

  get movespeed(): number {
    return this._movespeed;
  }
  set movespeed(value: number) {
    this._movespeed = value;
  }
}
