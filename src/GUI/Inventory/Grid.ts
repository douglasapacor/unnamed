import { UIComponent } from "../../lib/UI/UIComponent";

export class Grid extends UIComponent {
  constructor(containerId: string) {
    super("InventoryGrid", containerId);
  }

  update(delta: number): void {}
}
