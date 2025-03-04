import { gameState } from "../../global";
import { UIComponent } from "../../lib/UI/UIComponent";
import { Slot } from "../Slot";

export class Inventory extends UIComponent {
  private title: HTMLElement = document.createElement("div");
  private btnContainer: HTMLElement = document.createElement("div");
  private btnCentral: HTMLElement = document.createElement("div");
  private characterData: HTMLElement = document.createElement("div");
  private characterItem: HTMLElement = document.createElement("div");
  private characterStats: HTMLElement = document.createElement("div");
  private inventory: HTMLElement = document.createElement("div");
  private money: HTMLElement = document.createElement("div");
  private slots: Slot[] = [];

  constructor(id: string) {
    super(id);
    this.build();

    for (let i = 0; i < 80; i++) {
      const slot = new Slot(
        `slot-${i}`,
        this.inventory.clientWidth / 16,
        this.inventory.clientHeight / 5
      );

      this.slots.push(slot);
      this.inventory.appendChild(slot.getElement());
    }

    this.render();
  }

  private build(): void {
    this.element.style.width = " 36%";
    this.element.style.height = "70%";
    this.element.style.right = "15px";
    this.element.style.top = "40%";
    this.element.style.background = "#44403c";
    this.element.style.transform = "translateY(-40%)";
    this.element.style.border = "2px solid #b0b0b0";
    this.element.style.display = "grid";
    this.element.style.gridTemplateColumns = "100%";
    this.element.style.gridTemplateRows = "5% 56% 31% 8%";

    this.title.style.background = "rgb(0, 77, 64)";
    this.title.style.background =
      "linear-gradient(90deg, rgba(0, 77, 64, 1) 0%,rgba(0, 37, 31, 1) 100%)";
    this.title.style.color = "white";
    this.title.style.display = "flex";
    this.title.style.paddingLeft = "10px";
    this.title.style.paddingRight = "4px";
    this.title.style.alignItems = "center";
    this.title.style.justifyContent = "space-between";
    this.title.style.fontSize = "10pt";
    this.title.innerText = "INVENTÁRIO";

    this.btnContainer.style.background = "rgb(255, 255, 255)";
    this.btnContainer.style.background =
      "linear-gradient(145deg,rgba(255, 255, 255, 1) 0%,rgba(130, 90, 44, 1) 64%,rgba(93, 63, 28, 1) 100%)";
    this.btnContainer.style.width = "22px";
    this.btnContainer.style.height = "60%";
    this.btnContainer.style.display = "flex";
    this.btnContainer.style.alignItems = "center";
    this.btnContainer.style.justifyContent = "center";
    this.btnContainer.style.cursor = "pointer";

    this.btnCentral.style.background = "rgb(255, 255, 255)";
    this.btnCentral.style.background =
      "linear-gradient(145deg,rgba(255, 255, 255, 1) 0%,rgba(240, 186, 186, 1) 19%,rgba(240, 128, 128, 1) 40%,rgba(240, 128, 128, 1) 100%)";
    this.btnCentral.style.width = "80%";
    this.btnCentral.style.height = "80%";
    this.btnCentral.style.display = "flex";
    this.btnCentral.style.alignItems = "center";
    this.btnCentral.style.justifyContent = "center";
    this.btnCentral.innerText = "X";

    this.characterData.style.display = "grid";
    this.characterData.style.gridTemplateColumns = "60% 40%";
    this.characterData.style.gridTemplateRows = "100%";

    this.characterStats.style.background = "lightgray";
    this.characterStats.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 16px 2px #44403c inset";
    this.characterStats.style.padding = "16px";
    this.characterStats.style.display = "grid";
    this.characterStats.style.gap = "20px";
    this.characterStats.style.gridTemplateColumns = "100%";
    this.characterStats.style.gridTemplateRows = "repeat(5, 34px)";

    const strenght = document.createElement("div");
    const strTitle = document.createElement("span");
    strTitle.innerText = "Strength";
    strTitle.style.fontSize = "14pt";
    strTitle.style.marginLeft = "10px";
    const strValue = document.createElement("span");
    strValue.innerText = "100";
    strValue.style.fontSize = "10pt";
    strValue.style.marginRight = "20px";

    strenght.style.background = "rgb(255, 255, 255)";
    strenght.style.width = "100%";
    strenght.style.height = "40px";
    strenght.style.borderRadius = "6px";
    strenght.style.boxShadow =
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
    strenght.style.display = "flex";
    strenght.style.justifyContent = "space-between";
    strenght.style.alignItems = "center";

    strenght.appendChild(strTitle);
    strenght.appendChild(strValue);

    this.characterStats.appendChild(strenght);

    const dex = document.createElement("div");
    const dexTitle = document.createElement("span");
    dexTitle.innerText = "Dexterity";
    dexTitle.style.fontSize = "14pt";
    dexTitle.style.marginLeft = "10px";
    const dexValue = document.createElement("span");
    dexValue.innerText = "100";
    dexValue.style.fontSize = "10pt";
    dexValue.style.marginRight = "20px";
    dex.style.background = "rgb(255, 255, 255)";
    dex.style.width = "100%";
    dex.style.height = "40px";
    dex.style.borderRadius = "6px";
    dex.style.boxShadow =
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
    dex.style.display = "flex";
    dex.style.justifyContent = "space-between";
    dex.style.alignItems = "center";

    dex.appendChild(dexTitle);
    dex.appendChild(dexValue);

    this.characterStats.appendChild(dex);

    const intelligence = document.createElement("div");
    const intTitle = document.createElement("span");
    intTitle.innerText = "Inteligence";
    intTitle.style.fontSize = "14pt";
    intTitle.style.marginLeft = "10px";
    const intValue = document.createElement("span");
    intValue.innerText = "100";
    intValue.style.fontSize = "10pt";
    intValue.style.marginRight = "20px";
    intelligence.style.background = "rgb(255, 255, 255)";
    intelligence.style.width = "100%";
    intelligence.style.height = "40px";
    intelligence.style.borderRadius = "6px";
    intelligence.style.boxShadow =
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
    intelligence.style.display = "flex";
    intelligence.style.justifyContent = "space-between";
    intelligence.style.alignItems = "center";

    intelligence.appendChild(intTitle);
    intelligence.appendChild(intValue);

    this.characterStats.appendChild(intelligence);

    this.characterItem.style.background = "lightgray";
    this.characterItem.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 16px 2px #44403c inset";

    this.money.style.background = "lightgray";
    this.money.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 16px 2px #44403c inset";
    this.money.style.display = "flex";
    this.money.style.justifyContent = "center";
    this.money.style.alignItems = "center";

    this.btnContainer.appendChild(this.btnCentral);
    this.title.appendChild(this.btnContainer);
    this.element.appendChild(this.title);
    this.characterData.appendChild(this.characterItem);
    this.characterData.appendChild(this.characterStats);
    this.element.appendChild(this.characterData);
    this.element.appendChild(this.inventory);
    this.element.appendChild(this.money);

    this.inventory.style.background = "lightgray";
    this.inventory.style.boxShadow =
      "3px 3px 10px 2px #44403c inset, -3px -3px 16px 2px #44403c inset";
    this.inventory.style.display = "grid";
    this.inventory.style.gridTemplateColumns = `repeat(16, ${
      this.inventory.clientWidth / 16
    }px)`;
    this.inventory.style.gridTemplateRows = `repeat(5, ${
      this.inventory.clientHeight / 5
    }px)`;
  }

  render() {
    const inventoryItems = gameState.config.inventory || [];

    inventoryItems.forEach((itemId: string, index: number) => {
      const item = gameState.config.items?.find((i: any) => i.id === itemId);

      if (item && this.slots[index] && !this.slots[index].item) {
        this.slots[index].item = item;
        this.slots[
          index
        ].getElement().innerHTML = `<div draggable="true" class="item" data-id="${item.id}">${item.name}</div>`;
        this.slots[index]
          .getElement()
          .querySelector(".item")
          ?.addEventListener("dragstart", (e) =>
            this.slots[index].handleDragStart(e)
          );
      }
    });
  }

  update(data: any) {
    this.slots.forEach((slot) => slot.update(data));
  }
}
