export class PlayerHUD {
  private _container: HTMLElement;
  private _element: HTMLElement;

  constructor() {
    this._container = document.getElementById("ui-container")!;
    this._element = document.createElement("div");
    this._element.style.position = "absolute";
    this._element.style.background = "white";
    this._element.style.bottom = "0";
    this._element.style.left = "0";
    this._element.style.right = "0";
    this._element.style.height = "200px";
    this._container.appendChild(this._element);
  }

  update(delta: number): void {}
}
