import { World } from "cannon-es";
import { Scene } from "three";

export type gobject = {
  path: string;
  scene: Scene;
  world: World;
};
