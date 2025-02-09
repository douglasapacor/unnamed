export default class GObject {
  public readonly name?: string;

  constructor(params: { name?: string }) {
    this.name = params.name;
  }

  preload(): void {}
  create(): void {}
  update(delta: number): void {}
}
