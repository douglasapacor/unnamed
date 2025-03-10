import { Group, Object3DEventMap } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { gobject } from "./type";

export class GObject {
  private FBXObject!: Group<Object3DEventMap>;
  private _loader: FBXLoader;

  constructor(private params: gobject) {
    this._loader = new FBXLoader();

    this._loader.load(this.params.path, (object: Group<Object3DEventMap>) => {
      this.FBXObject = object;
      this.FBXObject.scale.set(0.01, 0.01, 0.01); // Reduz o tamanho
      this.FBXObject.position.set(0, 1, 0);
      this.params.scene.add(this.FBXObject);
    });
  }
}
