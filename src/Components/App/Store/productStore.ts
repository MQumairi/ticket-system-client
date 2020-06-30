import { observable, computed } from "mobx";
import { createContext } from "react";
import { IProduct } from "../../../Models/product";

interface IProductNames {
  [key: string]: any;
}

interface IOption {
  key: number,
  text: string,
  value: string
}

class ProductStore {
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

const ProductContext = createContext(new ProductStore());

export default {
  ProductContext,
  ProductStore,
};
