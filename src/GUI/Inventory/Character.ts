import { UIComponent } from "../../lib/UI/UIComponent";

export class Character extends UIComponent {
  constructor(containerId: string) {
    super("InventoryCharacter", containerId);
  }

  update(delta: number): void {}
}
