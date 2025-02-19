import * as CANNON from "cannon-es";

export interface ECBody extends CANNON.Body {
  name?: string;
}

export interface moves {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  idle: boolean;
}

export enum modelState {
  STTOPED,
  LOADING,
  FINISHED,
}
