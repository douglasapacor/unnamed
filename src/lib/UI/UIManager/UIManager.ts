import { UIComponent } from "../UIComponent";

export class UIManager {
  private components: Map<string, UIComponent>;

  constructor() {
    this.components = new Map();
  }

  public addComponent(component: UIComponent, id: string) {
    if (this.components.has(id)) {
      this.removeComponent(id);
    }

    this.components.set(id, component);
  }

  public removeComponent(id: string) {
    const component = this.components.get(id);

    if (component) {
      component.destroy();
      this.components.delete(id);
    }
  }

  public update(delta: number) {
    this.components.forEach((component) => {
      component.update(delta);
    });
  }
}
