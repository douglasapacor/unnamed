import { gameState } from "../../global";
import { UIComponent } from "../../lib/UI/UIComponent";

export class Slot extends UIComponent {
  item: { id: string; name: string } | null = null;

  constructor(id: string, w: number, h: number) {
    super(id);
    this.element.style.position = "relative";
    this.element.style.width = `${w - 2}px`;
    this.element.style.height = `${h - 2}px`;
    this.element.style.backgroundColor = "#555";
    this.element.style.border = "2px solid #888";
    this.element.style.display = "inline-block";

    this.element.addEventListener("dragover", (e) => e.preventDefault());
    this.element.addEventListener("drop", (e) => this.handleDrop(e));
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

  update(delta: number) {
    // Pode ser expandido para atualizar visualmente com base no estado
  }
}
