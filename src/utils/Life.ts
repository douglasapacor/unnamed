export default class Life {
  public total: number;
  public current: number;
  public percent: string;

  constructor(total: number, current: number) {
    this.total = total;
    this.current = current;

    this.calculate();
  }

  private calculate() {
    this.percent = `${((this.current / this.total) * 100).toFixed(2)}`;
  }

  damage(value: number) {
    this.current - value;
    this.calculate();
  }

  heal(value: number) {
    this.current + value;
    this.calculate();
  }
}
