import { UIComponent } from "../../lib/UI/UIComponent";
import { Equip } from "./Equip";

export class CharEquipament extends UIComponent {
  private equip: Equip;

  constructor(containerId: string) {
    super("CharEquipament", containerId);
    this.equip = new Equip("CharEquipament");
  }

  update(delta: number): void {
    this.equip.update(delta);
  }
}
