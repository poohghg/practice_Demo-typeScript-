import _, { add } from "lodash";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Product } from "../models/product";

const products = [
  { title: "T", price: 1 },
  { title: "E", price: 2 },
];
const loadedProducts = plainToClass(Product, products);
console.log(loadedProducts[0].getInformation());

const test = () => {
  const products = [
    { title: "T", price: 1 },
    { title: "E", price: 2 },
  ];
  const loadedProducts = plainToClass(Product, products);
  console.log(loadedProducts[0].getInformation());
  const App = document.querySelector("#app")! as HTMLDivElement;
  const templet: string = `<div>안녕하세요 잘되나요?</div>`;
  App.innerHTML = templet;
};

export default test;
