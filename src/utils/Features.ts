import Attributes from "./Attributes";
import Life from "./Life";

export class Features {
  public name: string;
  public life: Life;
  public attrtibutes: Attributes;

  constructor() {
    this.name = "vodka";
    this.life = new Life();
    this.attrtibutes = new Attributes();
  }
}
