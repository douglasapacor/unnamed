export enum SceneState {
  PRELOAD,
  CREATE,
  UPDATE,
}

export type actor = Partial<{
  preload: () => void;
  create: () => void;
  update: (delta: number) => void;
}>;
