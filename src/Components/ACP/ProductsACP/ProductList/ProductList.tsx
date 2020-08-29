import React, { useContext, useState } from "react";
import Store from "../../../App/Store/rootStore";
import { Card, Button } from "semantic-ui-react";
import ProductListCard from "./ProductListCard/ProductListCard";
import "./productList.css";
import ProductAddForm from "./ProductAddForm";
import { observer } from "mobx-react-lite";

const ProductList = () => {
  const store = useContext(Store);
  const { products } = store.productStore;

    const [addingProduct, setAddingProduct] = useState<boolean>(false);

  return (
    <div className="productListContainer">
      <Card.Group itemsPerRow={1}>
        {products.sort((p1, p2) => ('' + p1.product_name).localeCompare(p2.product_name)).map((product) => {
          return (<ProductListCard product={product}/>);
        })}
      </Card.Group>
      <hr/>
      {!addingProduct && <Button className="mainButton ticketNewSubmit" onClick={() => setAddingProduct(true)}>Add Product</Button>}
      {addingProduct && <ProductAddForm setAddingProduct={setAddingProduct}/>}
    </div>
  );
};

export default observer(ProductList);
