import * as CANNON from "cannon-es";

export interface movement {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  idle: boolean;
}

export interface ECANNONBody extends CANNON.Body {
  name?: any;
}
