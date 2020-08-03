import { observable, computed, action } from "mobx";
import { IProduct } from "../../../Models/product";
import { Store } from "./rootStore";
import { Products } from "../../../API/agent";

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

  @observable products: IProduct[] = [];

  @action loadProducts = async () => {
    try {
      this.products = await Products.list();
    }
    catch(e) {
      console.log(e);
    }
  }

  @computed get productNames() {
    let productFilters: IProductNames = {};
    this.products.forEach((product) => {
      productFilters[product.product_name] = false;
    });
    return productFilters;
  }

  @computed get productOptions() {

    let returnArr: IOption[] = []

    this.products.forEach((product) => {
      returnArr.push({
        key: product.product_id!,
        text: product.product_name,
        value: product.product_name
      });
    });

    return returnArr;
  }
}