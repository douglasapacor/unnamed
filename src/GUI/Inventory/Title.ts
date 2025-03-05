import { UIComponent } from "../../lib/UI/UIComponent";

export class Title extends UIComponent {
  private frame: HTMLElement = document.createElement("div");
  private button: HTMLElement = document.createElement("div");
  private text: HTMLElement = document.createElement("span");
  public click: () => void = () => {};

  constructor(containerId?: string) {
    super("Title", containerId);
    this.frame.id = "Frame";
    this.frame.onclick = this.click;

    this.button.id = "Bttn";
    this.button.innerText = "X";

    this.text.id = "Text";
    this.text.innerText = "INVENTÁRIO";

    this.button.appendChild(this.text);
    this.frame.appendChild(this.button);

    this.element.appendChild(this.text);
    this.element.appendChild(this.frame);
  }

  update(delta: number): void {}
}
