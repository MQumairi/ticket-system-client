import { observable, computed } from "mobx";
import { createContext } from "react";
import { IProduct } from "../../../Models/product";

interface IProductNames {
  [key: string]: any;
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
}

const ProductContext = createContext(new ProductStore());

export default {
  ProductContext,
  ProductStore,
};
