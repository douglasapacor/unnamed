import { GUI } from "../../lib/UI/GUI";
const config = {
  label: "INVENTÀRIO",
  width: "36%",
  height: "70%",
  right: "15px",
  top: "40%",
  transform: "translateY(-40%)",
};
export class Inventory extends GUI {
  private character: any;
  private grid: any;
  private money: any;

  constructor(id: string) {
    super(id, config);
  }

  update(delta: number): void {}
}
