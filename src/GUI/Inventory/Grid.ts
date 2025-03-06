import { UIComponent } from "../../lib/UI/UIComponent";
import { Slot } from "../Slot";

const countSlots = 72;

export class Grid extends UIComponent {
  private slots: Slot[] = [];
  private gridWraper: HTMLElement = document.createElement("div");

  constructor(containerId: string) {
    super("InventoryGrid", `content${containerId}`);

    this.element.style.background = "rgb(163, 199, 217)";
    this.element.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 10px 2px #44403c inset";
    this.element.style.display = "flex";
    this.element.style.justifyContent = "center";
    this.element.style.alignItems = "center";

    this.gridWraper.id = "Wrapper";
    this.gridWraper.style.width = "97%";
    this.gridWraper.style.height = "94%";
    this.gridWraper.style.display = "grid";

    this.element.appendChild(this.gridWraper);

    requestAnimationFrame(() => {
      this.setup();
    });
  }

  private setup() {
    const w = +(this.gridWraper.clientWidth / 12).toFixed(2);
    const h = +(this.gridWraper.clientHeight / 6).toFixed(2);

    this.gridWraper.style.gridTemplateColumns = `repeat(12, ${w}px)`;
    this.gridWraper.style.gridTemplateRows = `repeat(6, ${h}px)`;

    for (let i = 0; i < countSlots; i++) {
      const slot = new Slot(`slot-${i}`, w, h, "InventoryGrid");
      this.slots.push(slot);
      this.gridWraper.appendChild(slot.element);
    }
  }

  private render(): void {}

  update(delta: number): void {}
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
