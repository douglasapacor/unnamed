import { generateKey } from "../helpers/random";

export default abstract class BaseObjects {
  public readonly id: string;
  public readonly name?: string;

  constructor(params: { name?: string }) {
    this.id = generateKey(15);
    this.name = params.name;
  }

  preload(): void {}
  create(): void {}
  update(delta: number): void {}
}
