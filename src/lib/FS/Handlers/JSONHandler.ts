import { FileHandler } from "../FileHandler";

export class JSONHandler extends FileHandler {
  constructor(path: string) {
    super(path);
  }

  private async load(): Promise<any> {
    try {
      const data = await Neutralino.filesystem.readFile(this.path);

      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "NE_FS_FILRDER") {
        const jsonData = JSON.stringify({}, null, 2);
        await Neutralino.filesystem.writeFile(this.path, jsonData);
      }

      return {};
    }
  }

  async read(): Promise<any> {
    return await this.load();
  }

  async write(data: any): Promise<void> {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await Neutralino.filesystem.writeFile(this.path, jsonData);
    } catch (error) {
      throw error;
    }
  }
}
