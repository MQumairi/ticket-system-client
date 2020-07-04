import { observable, computed } from "mobx";
import { IProduct } from "../../../Models/product";
import { Store } from "./rootStore";

interface IProductNames {
  [key: string]: any;
}

interface IOption {
  key: number,
  text: string,
  value: string
}

export default class ProductStore {
  
  constructor(public rootStore: Store) {}

  @observable products: IProduct[] = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  @computed get productNames() {
    let productFilters: IProductNames = {};
    this.products.forEach((product) => {
      productFilters[product.name] = false;
    });
    return productFilters;
  }

  @computed get productOptions() {

    let returnArr: IOption[] = []

    this.products.forEach((product) => {
      returnArr.push({
        key: product.id,
        text: product.name,
        value: product.name
      });
    });

    return returnArr;
  }
}