export class BtnClose {
  protected _element: HTMLElement;
  protected _container: HTMLElement;
  private _internal: HTMLElement;
  private _text: HTMLElement;
  onclose: () => void = () => {};

  constructor(containerId: string) {
    this._container = document.getElementById(containerId)!;
    this._element = document.createElement("div");
    this._internal = document.createElement("div");

    this._text = document.createElement("span");
    this._text.innerText = "X";

    this._element.style.width = "22px";
    this._element.style.height = "60%";
    this._element.style.display = "flex";
    this._element.style.alignItems = "center";
    this._element.style.justifyContent = "center";
    this._element.style.cursor = "pointer";
    this._element.style.marginRight = "6px";
    this._element.style.background =
      "linear-gradient(145deg,rgba(255, 255, 255, 1) 0%,rgba(130, 90, 44, 1) 64%,rgba(93, 63, 28, 1) 100%)";

    this._internal.style.width = "80%";
    this._internal.style.height = "80%";
    this._internal.style.display = "flex";
    this._internal.style.alignItems = "center";
    this._internal.style.justifyContent = "center";
    this._internal.style.background =
      "linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(240, 186, 186, 1) 19%, rgba(240, 128, 128, 1) 40%, rgb(183, 28, 28) 100%)";

    this._internal.appendChild(this._text);
    this._element.appendChild(this._internal);
    this._container.appendChild(this._element);

    this._element.onclick = () => {
      this.onclose();
    };
  }

  get element(): HTMLElement {
    return this._element;
  }

  public destroy() {
    this._container.removeChild(this._element);
  }
}
