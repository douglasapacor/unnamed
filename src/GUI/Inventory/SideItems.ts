import { gameState } from "../../global";
import { generateKey } from "../../helpers/random";
import { UIComponent } from "../../lib/UI/UIComponent";

export class SideItems extends UIComponent {
  item: { id: string; name: string } | null = null;
  private slot01: HTMLElement = document.createElement("div");
  private slot02: HTMLElement = document.createElement("div");
  private slot03: HTMLElement = document.createElement("div");
  private slot04: HTMLElement = document.createElement("div");
  private slot05: HTMLElement = document.createElement("div");

  constructor(containerId: string) {
    super(`${generateKey(5)}SideItem`, containerId);
    this.element.classList.add("char-equip-column");

    this.slot01.classList.add("equip-item");
    this.slot01.addEventListener("dragover", (e) => e.preventDefault());
    this.element.appendChild(this.slot01);

    this.slot02.classList.add("equip-item");
    this.element.appendChild(this.slot02);

    this.slot03.classList.add("equip-item");
    this.element.appendChild(this.slot03);

    this.slot04.classList.add("equip-item");
    this.element.appendChild(this.slot04);

    this.slot05.classList.add("equip-item");
    this.element.appendChild(this.slot05);
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();

    const itemId = e.dataTransfer?.getData("text/plain");

    if (itemId && !this.item) {
      this.item =
        gameState.config.items?.find((i: any) => i.id === itemId) || null;

      if (this.item) {
        this.element.innerHTML = `<div draggable="true" class="item" data-id="${this.item.id}">${this.item.name}</div>`;
        this.element
          .querySelector(".item")
          ?.addEventListener("dragstart", (e) => this.handleDragStart(e));
        gameState.config.inventory =
          gameState.config.inventory?.filter((i: string) => i !== itemId) || [];
      }
    }
  }

  handleDragStart(e: any) {
    if (this.item) {
      e.dataTransfer?.setData("text/plain", this.item.id);
      setTimeout(() => {
        this.item = null;
        this.element.innerHTML = "";
      }, 0);
    }
  }

  update(delta: number): void {}
}
