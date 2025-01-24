export default class GameObject {
  private name: string = "";

  constructor(name?: string) {
    this.name = name;
  }

  get _name(): string {
    return this.name;
  }

  preload(): void {}
  create(): void {}
  update(delta: number): void {}
}
