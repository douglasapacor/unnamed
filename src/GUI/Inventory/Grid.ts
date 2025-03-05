import { UIComponent } from "../../lib/UI/UIComponent";

export class Grid extends UIComponent {
  private frame: HTMLElement = document.createElement("div");

  constructor(containerId: string) {
    super("Grid", containerId);
    this.frame.style.width = "97%";
    this.frame.style.height = "93%";

    this.element.appendChild(this.frame);

    this.frame.id = "GridFrame";
    this.frame.style.display = "grid";

    this.frame.style.gridTemplateColumns = `repeat(16, ${
      this.frame.clientWidth / 16
    }px)`;
    this.frame.style.gridTemplateRows = `repeat(5, ${
      this.frame.clientHeight / 5
    }px)`;
  }

  update(delta: number): void {}

  addSlot(node: Node): void {
    this.frame.appendChild(node);
  }

  get widthFrame(): number {
    return this.frame.clientWidth / 16;
  }

  get heigthFrame(): number {
    return this.frame.clientHeight / 5;
  }
}
