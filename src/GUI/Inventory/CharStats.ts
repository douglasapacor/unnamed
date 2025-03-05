import { UIComponent } from "../../lib/UI/UIComponent";
import { Stat } from "./Stat";

export class CharStats extends UIComponent {
  private intelligenceStatus: Stat;
  private strengthStatus: Stat;
  private dexterityStatus: Stat;

  constructor(containerId: string) {
    super("CharStats", containerId);
    this.intelligenceStatus = new Stat(
      "Intelligence",
      "Inteligence",
      "CharStats"
    );
    this.strengthStatus = new Stat("Dexterity", "Dexterity", "CharStats");
    this.dexterityStatus = new Stat("Strength", "Strength", "CharStats");

    this.intelligenceStatus.val = "300";
    this.dexterityStatus.val = "300";
    this.strengthStatus.val = "300";
  }

  update(delta: number): void {
    this.intelligenceStatus.update(delta);
    this.strengthStatus.update(delta);
    this.dexterityStatus.update(delta);
  }
}
