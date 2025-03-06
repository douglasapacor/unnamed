import { UIComponent } from "../../lib/UI/UIComponent";

export class Character extends UIComponent {
  private equipament: HTMLElement;
  private stats: HTMLElement;

  constructor(containerId: string) {
    super("InventoryCharacter", containerId);
    this._element.style.display = "grid";
    this._element.style.gridTemplateColumns = "55% 45%";
    this._element.style.gridTemplateRows = "100%";

    this.equipament = document.createElement("div");
    this.equipament.id = "CharacterEquipament";
    this.equipament.style.background = "rgb(29, 41, 47)";
    this.equipament.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 10px 2px #44403c inset";
    this.add(this.equipament);

    this.stats = document.createElement("div");
    this.stats.id = "CharacterStats";
    this.stats.style.background = "rgb(29, 41, 47)";
    this.stats.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 10px 2px #44403c inset";
    this.add(this.stats);
  }

  update(delta: number): void {}
}
