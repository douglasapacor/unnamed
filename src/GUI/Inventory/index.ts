import { GUI } from "../../lib/UI/GUI";
import { Character } from "./Character";
import { Grid } from "./Grid";
import { Money } from "./Money";
const config = {
  label: "INVENTÀRIO",
  width: "36%",
  height: "70%",
  right: "15px",
  top: "40%",
  transform: "translateY(-40%)",
};
export class Inventory extends GUI {
  private character: Character;
  private grid: Grid;
  private money: Money;

  constructor(id: string) {
    super(id, config);
    this.character = new Character(id);
    this.grid = new Grid(id);
    this.money = new Money(id);
    this.content.style.gridTemplateColumns = "100%";
    this.content.style.gridTemplateRows = "50% 40% 10%";
  }

  update(delta: number): void {
    this.character.update(delta);
    this.grid.update(delta);
    this.money.update(delta);
  }
}
