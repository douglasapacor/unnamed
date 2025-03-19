import Actor from "../Actor";

export default class ActorManager {
  private actors: Map<string, Actor>;

  constructor() {
    this.actors = new Map();
  }

  public addActor(actor: Actor, id: string) {
    if (this.actors.has(id)) {
      this.removeActor(id);
    }

    this.actors.set(id, actor);
  }

  public removeActor(id: string) {
    const actor = this.actors.get(id);
    if (actor) this.actors.delete(id);
  }

  public update(delta: number) {
    this.actors.forEach((actor) => {
      actor.update(delta);
    });
  }
}
