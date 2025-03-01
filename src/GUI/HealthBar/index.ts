import { gameState } from "../../global";
import { UIComponent } from "../../lib/UI/UIComponent";

export class HealthBar extends UIComponent {
  private bar: HTMLElement;

  constructor(id: string) {
    super(id);
    this.element.style.top = "10px";
    this.element.style.left = "10px";
    this.element.style.width = "200px";
    this.element.style.height = "20px";
    this.element.style.backgroundColor = "#444";
    this.element.style.border = "1px solid #fff";
    this.element.style.zIndex = "99";

    this.bar = document.createElement("div");
    this.bar.style.height = "100%";
    this.bar.style.backgroundColor = "#ff0000";

    this.element.appendChild(this.bar);
  }

  update() {
    const percent =
      (gameState.player.health / gameState.player.maxHealth) * 100;
    this.bar.style.width = `${percent}%`;
    this.element.title = `Vida: ${gameState.player.health}/${gameState.player.maxHealth}`;
  }
}
