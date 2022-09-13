import { Product } from "./models/product";
import ProjectInput from "./components/project-input";
import ProjectList from "./components/project-list";

import _ from "lodash";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

const products = [
  { title: "T", price: 1 },
  { title: "E", price: 2 },
];
const loadedProducts = plainToClass(Product, products);
console.log(loadedProducts[0].getInformation());
const prjInput = new ProjectInput();
const prjList1 = new ProjectList("active");
const prjList2 = new ProjectList("finished");
