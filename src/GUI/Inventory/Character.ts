import { UIComponent } from "../../lib/UI/UIComponent";
import { CharEquipament } from "./CharEquipament";
import { CharStats } from "./CharStats";

export class Character extends UIComponent {
  private charStats: CharStats;
  private charEquipaments: CharEquipament;

  constructor(containerId: string) {
    super("Character", containerId);

    this.charEquipaments = new CharEquipament("Character");
    this.charStats = new CharStats("Character");
  }

  update(delta: number): void {
    this.charStats.update(delta);
    this.charEquipaments.update(delta);
  }
}
