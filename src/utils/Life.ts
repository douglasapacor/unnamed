export default class Life {
  private _total: number;
  private _current: number;
  private _percent: string;

  constructor(total: number = 100, current: number = 100) {
    this._total = total;
    this._current = current;

    this.calculate();
  }

  get total(): number {
    return this._total;
  }

  get current(): number {
    return this._current;
  }

  get percent(): string {
    return this._percent;
  }

  private calculate() {
    this._percent = `${((this._current / this._total) * 100).toFixed(2)}%`;
  }

  public augment(value: number) {
    this._current += value;
    this.calculate();
  }

  public withdraw(value: number) {
    this._current -= value;
    this.calculate();
  }
}
