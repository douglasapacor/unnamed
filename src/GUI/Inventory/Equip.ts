import { UIComponent } from "../../lib/UI/UIComponent";
import { CenterItem } from "./CenterItem";
import { SideItems } from "./SideItems";

export class Equip extends UIComponent {
  private left: SideItems;
  private center: CenterItem;
  private right: SideItems;

  constructor(containerId: string) {
    super("Equip", containerId);

    this.left = new SideItems("Equip");
    this.center = new CenterItem("Equip");
    this.right = new SideItems("Equip");
  }

  update(delta: number): void {
    this.left.update(delta);
    this.center.update(delta);
    this.right.update(delta);
  }
}
