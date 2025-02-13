export class Attributes {
  public name: string;
  public life_total: number;
  public life_actual: number;
  public strenght: number;
  public dexterity: number;
  public intelligence: number;
  public speed: number;
  public jumpForce: number;

  constructor() {
    this.name = "vodka";

    this.strenght = 10;
    this.dexterity = 10;
    this.intelligence = 10;

    this.speed = 18;
    this.jumpForce = 10;
  }
}
