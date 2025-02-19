export class InputManager {
  private static _instance: InputManager;
  private _keyState: Record<string, boolean> = {};
  private _mouseState = { x: 0, y: 0, buttons: {} as Record<number, boolean> };
  private _subscribers: Set<(key: string, state: boolean) => void> = new Set();

  private constructor() {
    this.initListeners();
  }

  public static get instance(): InputManager {
    if (!this._instance) this._instance = new InputManager();
    return this._instance;
  }

  private initListeners(): void {
    window.addEventListener("keydown", (e) => this.updateKeyState(e, true));
    window.addEventListener("keyup", (e) => this.updateKeyState(e, false));
    window.addEventListener("mousemove", (e) => this.updateMousePosition(e));
    window.addEventListener("mousedown", (e) =>
      this.updateMouseButton(e, true)
    );
    window.addEventListener("mouseup", (e) => this.updateMouseButton(e, false));
  }

  private updateKeyState(event: KeyboardEvent, state: boolean): void {
    this._keyState[event.code] = state;
    this.notifySubscribers(event.code, state);
  }

  private updateMousePosition(event: MouseEvent): void {
    this._mouseState.x = event.clientX;
    this._mouseState.y = event.clientY;
  }

  private updateMouseButton(event: MouseEvent, state: boolean): void {
    this._mouseState.buttons[event.button] = state;
    this.notifySubscribers(`mouse_${event.button}`, state);
  }

  private notifySubscribers(key: string, state: boolean): void {
    this._subscribers.forEach((callback) => callback(key, state));
  }

  public subscribe(callback: (key: string, state: boolean) => void): void {
    this._subscribers.add(callback);
  }

  public unsubscribe(callback: (key: string, state: boolean) => void): void {
    this._subscribers.delete(callback);
  }

  public isKeyDown(key: string): boolean {
    return !!this._keyState[key];
  }

  public isMouseButtonDown(button: number): boolean {
    return !!this._mouseState.buttons[button];
  }

  public getMousePosition(): { x: number; y: number } {
    return { x: this._mouseState.x, y: this._mouseState.y };
  }
}
