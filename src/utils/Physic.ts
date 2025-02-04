import * as CANNON from "cannon-es";

export default class Physic {
  private world!: CANNON.World;

  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
  }

  get _world(): CANNON.World {
    return this.world;
  }

  set _world(body: CANNON.Body) {
    this.world.addBody(body);
  }

  update() {
    this.world.step(1 / 60);
  }
}
