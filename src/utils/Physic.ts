import * as CANNON from "cannon-es";

export default class Physic {
  public world!: CANNON.World;

  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
  }

  update() {
    this.world.step(1 / 60);
  }
}
