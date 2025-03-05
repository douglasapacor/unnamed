import { gameState } from "../../global";
import { UIComponent } from "../../lib/UI/UIComponent";
import { Slot } from "../Slot";
import { Character } from "./Character";
import { Grid } from "./Grid";
import { Money } from "./Money";
import { Title } from "./Title";

export class Inventory extends UIComponent {
  private title: Title;
  private char: Character;
  private grid: Grid;
  private money: Money;
  private slots: Slot[] = [];

  constructor(id: string) {
    super(id);
    this.title = new Title(id);
    this.char = new Character(id);
    this.grid = new Grid(id);
    this.money = new Money(id);

    for (let i = 0; i < 80; i++) {
      const slot = new Slot(
        `slot-${i}`,
        this.grid.widthFrame,
        this.grid.heigthFrame
      );
      this.slots.push(slot);
      this.grid.addSlot(slot.getElement());
    }

    this.render();
  }

  render() {
    const inventoryItems = gameState.config.inventory || [];

    inventoryItems.forEach((itemId: string, index: number) => {
      const item = gameState.config.items?.find((i: any) => i.id === itemId);

      if (item && this.slots[index] && !this.slots[index].item) {
        this.slots[index].item = item;
        this.slots[
          index
        ].getElement().innerHTML = `<div draggable="true" class="item" data-id="${item.id}">${item.name}</div>`;
        this.slots[index]
          .getElement()
          .querySelector(".item")
          ?.addEventListener("dragstart", (e) =>
            this.slots[index].handleDragStart(e)
          );
      }
    });
  }

  update(delta: any) {
    this.title.update(delta);
    this.char.update(delta);
    this.grid.update(delta);
    this.money.update(delta);
    this.slots.forEach((slot) => slot.update(delta));
  }
}
