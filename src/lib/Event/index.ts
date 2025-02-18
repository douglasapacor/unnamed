import { emitEvent, eventCallbacks, onEvent } from "./type";

export class Event {
  private callbacks: eventCallbacks[] = [];
  private nextId: number = 0;

  public emit(params: emitEvent) {
    this.callbacks.forEach((stored) => {
      if (stored.name === params.name) stored.callback(params.value);
    });
  }

  public on(params: onEvent): number {
    this.nextId += 1;

    this.callbacks.push({
      id: this.nextId,
      name: params.name,
      caller: params.caller,
      callback: params.callback,
    });

    return this.nextId;
  }

  public off(id: number): void {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  public unsubscribe(caller: any): void {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}
