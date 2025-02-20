import Attributes from "../../../lib/Attributes";
import Entity from "../../../lib/Entity";
import Life from "../../../lib/Life";

export default class Exemple001 extends Entity {
  public life: Life;
  public attributes: Attributes;

  public preload() {
    super.preload();
    this.life = new Life();
    this.attributes = new Attributes();
    console.log("load");
  }

  public create() {
    console.log("create");
  }

  public update(delta: number) {
    super.update(delta);
    console.log("update");
  }
}
