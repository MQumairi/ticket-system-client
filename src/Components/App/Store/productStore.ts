import { observable, computed, action, runInAction } from "mobx";
import { IProduct } from "../../../Models/product";
import { Store } from "./rootStore";
import { Products } from "../../../API/agent";
import { IOption } from "../../../Models/options";

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

  @action addProduct = async (product: IProduct) => {
    try {
      await Products.add(product);
      runInAction(() => {
        this.products.push(product);
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action editProduct = async (product_id: string, product: IProduct) => {
    try {
      await Products.edit(product_id, product);
    } catch (e) {
      console.log(e);
    }
  };

  @action deleteProduct = async (product_id: string) => {
    try {
      await Products.delete(product_id);
      runInAction(() => {
        this.products = this.products.filter(
          (product) => product.product_id?.toString() !== product_id
        );

        Array.from(this.rootStore.ticketStore.ticketsRegistry).forEach(
          ([key, ticket]) => {
            if (ticket.product.product_id?.toString() === product_id) {
              this.rootStore.ticketStore.ticketsRegistry.delete(key);
            }
          }
        );
      });
    } catch (e) {
      console.log(e);
    }
  };
}
