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

// render() {
//   const inventoryItems = gameState.config.inventory || [];

//   inventoryItems.forEach((itemId: string, index: number) => {
//     const item = gameState.config.items?.find((i: any) => i.id === itemId);

//     if (item && this.slots[index] && !this.slots[index].item) {
//       this.slots[index].item = item;
//       this.slots[
//         index
//       ].getElement().innerHTML = `<div draggable="true" class="item" data-id="${item.id}">${item.name}</div>`;
//       this.slots[index]
//         .getElement()
//         .querySelector(".item")
//         ?.addEventListener("dragstart", (e) =>
//           this.slots[index].handleDragStart(e)
//         );
//     }
//   });
// }
