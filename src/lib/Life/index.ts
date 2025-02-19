export default class Life {
  private _total: number;
  private _currently: number;
  private _percent: string;

  constructor() {
    this._total = 100;
    this._currently = 100;
    this._percent = `${((this._currently / this._total) * 100).toFixed(2)}%`;
  }

  get total(): number {
    return this._total;
  }

  get currently(): number {
    return this._currently;
  }

  get percent(): string {
    return this._percent;
  }

  damage(value: number): void {
    this._currently -= value;
    this._percent = `${((this._currently / this._total) * 100).toFixed(2)}%`;
  }

  heal(value: number): void {
    this._currently += value;
    this._percent = `${((this._currently / this._total) * 100).toFixed(2)}%`;
  }
}
