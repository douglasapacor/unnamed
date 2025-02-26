export abstract class FileHandler {
  protected path: string;

  constructor(path: string) {
    this.path = path;
  }

  abstract read(): Promise<any>;
  abstract write(data: any): Promise<void>;

  public getPath(): string {
    return this.path;
  }
}
