import { GUI } from "../GUI";

export class GUIManager {
  private guis: Map<string, GUI>;

  constructor() {
    this.guis = new Map();
  }

  public addGui(gui: GUI, id: string) {
    if (this.guis.has(id)) {
      this.removeComponent(id);
    }

    this.guis.set(id, gui);
  }

  public removeComponent(id: string) {
    const gui = this.guis.get(id);

    if (gui) {
      gui.destroy();
      this.guis.delete(id);
    }
  }

  public update(delta: number) {
    this.guis.forEach((gui) => {
      gui.update(delta);
    });
  }
}
