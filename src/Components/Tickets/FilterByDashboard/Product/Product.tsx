import React, { useContext } from "react";
import Store from "../../../App/Store/rootStore";
import ProductItem from "./ProductItem";
import "./product.css";

const Product = () => {

  const store = useContext(Store);
  const { products } = store.productStore;

  return (
    <div>
      <h4 className="filterTitle">Product</h4>

      {products.map((product) => {
        return (
          <ProductItem name={product.product_name} id={product.product_id!}></ProductItem>
        );
      })}
    </div>
  );
};

export default Product;
