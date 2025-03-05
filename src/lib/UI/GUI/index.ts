import { generateKey } from "../../../helpers/random";
import { BtnClose } from "./BtnClose";
import { gui } from "./type";

export abstract class GUI {
  private _container: HTMLElement;
  private _element: HTMLElement;
  private _title: HTMLElement;
  private _titleText: HTMLElement;
  private _content: HTMLElement;
  private _closeBtn: BtnClose;

  constructor(id: string, config: gui) {
    this._container = document.getElementById("ui-container")!;
    this._element = document.createElement("div");
    this._title = document.createElement("div");
    this._titleText = document.createElement("span");
    this._content = document.createElement("div");

    const idtitle = `TitleContainer${generateKey(9)}`;

    this._title.id = idtitle;
    this._title.style.position = "relative";
    this._title.style.color = "white";
    this._title.style.display = "flex";
    this._title.style.alignItems = "center";
    this._title.style.justifyContent = "space-between";
    this._title.style.background =
      "linear-gradient(90deg,rgba(89, 185, 173, 1) 0%,rgba(0, 105, 92, 1) 22%,rgba(0, 77, 64, 1) 39%,rgba(0, 5, 4, 1) 61%)";

    this._titleText.innerText = config.label;
    this._titleText.style.marginLeft = "15px";

    this._element.id = id;
    this._element.style.width = config.width;
    this._element.style.height = config.height;
    this._element.style.pointerEvents = "auto";
    this._element.style.position = "absolute";
    this._element.style.fontFamily = "Arial, sans-serif";
    this._element.style.background = "#44403c";
    this._element.style.border = "2px solid #b0b0b0";
    this._element.style.display = "grid";
    this._element.style.gridTemplateColumns = "100%";
    this._element.style.gridTemplateRows = "5% 95%";

    if (config.top) this._element.style.top = config.top;
    if (config.bottom) this._element.style.bottom = config.bottom;
    if (config.right) this._element.style.right = config.right;
    if (config.left) this._element.style.left = config.left;
    if (config.transform) this._element.style.transform = config.transform;

    this._content.style.display = "grid";
    this._content.id = `content${id}`;

    this._title.appendChild(this._titleText);
    this._element.appendChild(this._title);
    this._element.appendChild(this._content);
    this._container.appendChild(this._element);

    this._closeBtn = new BtnClose(idtitle);

    this._closeBtn.onclose = () => {
      this._element.style.display = "none";
    };
  }

  abstract update(delta: number): void;

  get content(): HTMLElement {
    return this._content;
  }

  destroy() {
    this._container.removeChild(this._element);
  }

  add(node: Node): void {
    this._content.appendChild(node);
  }
}
