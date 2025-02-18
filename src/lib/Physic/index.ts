import * as CANNON from "cannon-es";

export default class Physic {
  public world: CANNON.World;

  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
  }

  update(delta: number) {
    this.world.step(1 / 60, delta, 5);
  }
}
