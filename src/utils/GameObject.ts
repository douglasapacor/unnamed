export default class GameObject {
  public readonly name: string = "";

  constructor(name?: string) {
    this.name = name;
  }

  preload(): void {}
  create(): void {}
  update(delta: number): void {}
}
