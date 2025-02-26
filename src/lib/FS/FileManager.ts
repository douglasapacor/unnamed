import { FileHandler } from "./FileHandler";

export class FileManager {
  private handlers: Map<string, FileHandler>;

  constructor() {
    this.handlers = new Map();
  }

  public registerHandler(handler: FileHandler, id: string) {
    if (this.handlers.has(id)) {
      console.warn(`Handler ${id} já registrado, sobrescrevendo...`);
    }
    this.handlers.set(id, handler);
  }

  public removeHandler(id: string) {
    this.handlers.delete(id);
  }

  public async read(id: string): Promise<any> {
    const handler = this.handlers.get(id);
    if (!handler) throw new Error(`Handler ${id} não encontrado`);
    return await handler.read();
  }

  public async write(id: string, data: any): Promise<void> {
    const handler = this.handlers.get(id);
    if (!handler) throw new Error(`Handler ${id} não encontrado`);
    await handler.write(data);
  }
}
