//Don't forget to:
// -- install mobx and mobx-react-lite (the latter for observers)
// -- use observables for states, and actions to mutate
// -- useContext in relevant components
// -- deconstruct the store
// -- set the component as an observer by wraping when export with observer(componentName).

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
