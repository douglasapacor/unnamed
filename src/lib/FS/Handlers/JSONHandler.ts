import { FileHandler } from "../FileHandler";

export class JSONHandler extends FileHandler {
  constructor(path: string) {
    super(path);
  }

  async load(): Promise<any> {
    try {
      return JSON.parse(await Neutralino.filesystem.readFile(this.path));
    } catch (error: any) {
      if (error.code === "NE_FS_FILRDER") {
        const jsonData = JSON.stringify({}, null, 2);
        await Neutralino.filesystem.writeFile(this.path, jsonData);
      }
      return {};
    }
  }

  async read(): Promise<any> {
    try {
      const data = await Neutralino.filesystem.readFile(this.path);
      return JSON.parse(data);
    } catch (error: any) {
      throw error;
    }
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
