import React, { useContext } from "react";
import Store from "../../../App/Store/rootStore";
import ProductItem from "./ProductItem";
import "./product.css";
import { observer } from "mobx-react-lite";

const Product = () => {

  const store = useContext(Store);
  const { products } = store.productStore;

  return (
    <div>
      <h4 className="filterTitle">Product</h4>

      {products.map((product) => {
        return (
          <ProductItem key={product.product_id} name={product.product_name} id={product.product_id!}></ProductItem>
        );
      })}
    </div>
  );
};

export default observer(Product);
