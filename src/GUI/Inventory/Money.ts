import { UIComponent } from "../../lib/UI/UIComponent";

export class Money extends UIComponent {
  constructor(containerId: string) {
    super("Money", containerId);
  }

  update(delta: number): void {}
}
