import { gameState } from "../../global";
import { UIComponent } from "../../lib/UI/UIComponent";
import { Slot } from "../Slot";

export class Inventory extends UIComponent {
  private slots: Slot[] = [];

  constructor(id: string) {
    super(id);
    this.element.classList.add("inventory");
    this.element.style.position = "absolute";
    this.element.style.width = "33%";
    this.element.style.top = "0";
    this.element.style.right = "0";
    this.element.style.bottom = "0";
    this.element.style.backgroundColor = "#333";

    // this.itemArea = document.createElement("div");
    // this.itemArea.style.height = "20%";
    // this.itemArea.style.backgroundColor = "#F44336";
    // this.itemArea.style.boxShadow = "inset 0 0 15px #F44336;";

    // this.itemArea.style.width = "100%";
    // this.itemArea.style.display = "grid";
    // this.itemArea.style.gridTemplateColumns = "repeat(18, 35px)";
    // this.itemArea.style.gridTemplateRows = "repeat(5, 38px)";

    // for (let i = 0; i < 90; i++) {
    //   const slot = new Slot(`slot-${i}`);
    //   this.slots.push(slot);
    //   this.itemArea.appendChild(slot.getElement());
    // }

    // this.element.appendChild(title);
    // this.element.appendChild(this.itemArea);
    // this.render();
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

  update(data: any) {
    this.slots.forEach((slot) => slot.update(data));
  }
}
