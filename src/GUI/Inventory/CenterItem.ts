import { UIComponent } from "../../lib/UI/UIComponent";

export class CenterItem extends UIComponent {
  constructor(containerId: string) {
    super("CenterITem", containerId);
    this.element.style.position = "relative";
  }

  update(delta: number): void {}
}
