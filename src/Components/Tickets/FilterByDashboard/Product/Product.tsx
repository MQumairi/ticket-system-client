import React, { useContext } from "react";
import ProductStore from "../../../App/Store/productStore";
import TicketStore from "../../../App/Store/ticketStore";
import "./product.css";

const Product = () => {
  const productStore = useContext(ProductStore);
  const { products } = productStore;

  const ticketStore = useContext(TicketStore);
  const { filterTicketsByProduct } = ticketStore;

  return (
    <div>
      <h4 className="filterTitle">Product</h4>

      {products.map((product) => {
        return (
          <button
            onClick={() => filterTicketsByProduct(product.name)}
            className="productItem"
            key={product.id}
          >
            {product.name}
          </button>
        );
      })}
    </div>
  );
};

export default Product;
