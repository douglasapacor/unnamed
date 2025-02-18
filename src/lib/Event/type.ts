export type eventCallbacks = {
  id: number;
  name: string;
  caller: any;
  callback: (data: any) => void;
};

export type emitEvent = {
  name: string;
  value: any;
};

export type onEvent = {
  name: string;
  caller: any;
  callback: (data: any) => void;
};
