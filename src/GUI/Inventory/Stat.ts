import { UIComponent } from "../../lib/UI/UIComponent";

export class Stat extends UIComponent {
  private attribute: HTMLElement = document.createElement("span");
  private showvalue: HTMLElement = document.createElement("span");

  constructor(name: string, label: string, containerId: string) {
    super(`${name}Stat`, containerId);
    this.element.classList.add("attribute-plate");
    this.attribute.innerText = label;
    this.showvalue.style.fontSize = "10pt";

    this.element.appendChild(this.attribute);
    this.element.appendChild(this.showvalue);
  }

  set val(val: string) {
    this.showvalue.innerText = val;
  }

  update(delta: number): void {}
}
