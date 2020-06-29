import React, { useContext, useState } from "react";
import ProductStore from "../../../App/Store/productStore";
import ProductItem from "./ProductItem";
import "./product.css";

const Product = () => {

  const productStore = useContext(ProductStore);
  const { products } = productStore;

  return (
    <div>
      <h4 className="filterTitle">Product</h4>

      {products.map((product) => {
        return (
          <ProductItem name={product.name} id={product.id}></ProductItem>
        );
      })}
    </div>
  );
};

export default Product;
