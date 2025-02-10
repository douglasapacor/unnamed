export class Attributes {
  public name: string;
  public life: {
    now: number;
    total: number;
  };
  public strenght: number;
  public dexterity: number;
  public intelligence: number;

  public speed: number;
  public jumpForce: number;

  constructor() {
    this.name = "vodka";

    this.life = { total: 100, now: 100 };

    this.strenght = 10;
    this.dexterity = 10;
    this.intelligence = 10;

    this.speed = 14;
    this.jumpForce = 10;
  }
}
