import { observable, computed, action } from "mobx";
import { IProduct } from "../../../Models/product";
import { Store } from "./rootStore";
import { Products } from "../../../API/agent";
import { IOption } from "../../../Models/options";

interface IProductNames {
  [key: string]: any;
}

export default class ProductStore {
  //Constructors
  constructor(public rootStore: Store) {}

  //Initialize an array of products
  @observable products: IProduct[] = [];

  //Load products from API to client array
  @action loadProducts = async () => {
    try {
      this.products = await Products.list();
    } catch (e) {
      console.log(e);
    }
  };

  // @computed get productNames() {
  //   let productFilters: IProductNames = {};
  //   this.products.forEach((product) => {
  //     productFilters[product.product_name] = false;
  //   });
  //   return productFilters;
  // }

  // @action getProduct = (product_id: number) => {
  //   return this.products
  // }

  @computed get productOptions() {
    let returnArr: IOption[] = [];

    this.products.forEach((product) => {
      returnArr.push({
        key: product.product_id!,
        text: product.product_name,
        value: product,
      });
    });

    return returnArr;
  }
}
