import * as CANNON from "cannon-es";

export interface ECBody extends CANNON.Body {
  data?: { type: string };
}
