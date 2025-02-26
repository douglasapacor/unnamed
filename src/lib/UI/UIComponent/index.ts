export abstract class UIComponent {
  protected element: HTMLElement;
  protected container: HTMLElement;

  constructor(id: string, containerId: string = "ui-container") {
    this.container = document.getElementById(containerId)!;
    this.element = document.createElement("div");
    this.element.id = id;
    this.element.className = "ui-element";
    this.container.appendChild(this.element);
  }

  abstract update(delta: number): void;

  public destroy() {
    this.container.removeChild(this.element);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
