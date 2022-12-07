import fs from "fs";
import { resolve } from "path";

const BASEPATH = resolve();

export enum DBField {
  CART = "cart",
  PRODUCT = "product",
}

const filenames = {
  [DBField.CART]: resolve(BASEPATH, "src/db/cart.json"),
  [DBField.PRODUCT]: resolve(BASEPATH, "src/db/cart.json"),
};

export const readDB = (target: DBField) => {
  return JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
};

export const writeDB = (target: DBField, data: any) => {
  fs.writeFileSync(filenames[target], JSON.stringify(data));
};
