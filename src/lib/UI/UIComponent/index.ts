export abstract class UIComponent {
  protected _container: HTMLElement;
  protected _element: HTMLElement;

  constructor(id: string, containerId: string) {
    this._container = document.getElementById(containerId)!;
    this._element = document.createElement("div");
    this._element.id = id;
    this._element.style.pointerEvents = "auto";
    this._element.style.position = "absolute";
    this._element.style.fontFamily = "Arial, sans-serif";
    this._container.appendChild(this._element);
  }

  get element(): HTMLElement {
    return this._element;
  }

  abstract update(delta: number): void;

  destroy() {
    this._container.removeChild(this._element);
  }

  add(node: Node): void {
    this._element.appendChild(node);
  }
}
