import { UIComponent } from "../../lib/UI/UIComponent";

export class Money extends UIComponent {
  constructor(containerId: string) {
    super("InventoryMoney", `content${containerId}`);
    this.element.style.background = "rgb(163, 199, 217)";
    this.element.style.boxShadow = `3px 3px 10px 2px #44403c inset, -3px -3px 10px 2px #44403c inset`;
  }

  update(delta: number): void {}
}
