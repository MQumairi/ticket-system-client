import React, { useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { IProduct } from "../../../../../Models/product";
import "./productListCard.css";
import ProductListCardEditForm from "./ProductListCardEditForm";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

const ProductListCard: React.FC<IProps> = ({ product }) => {
  const [editingProduct, setEditingProduct] = useState<boolean>(false);

  return (
    <Card>
      {!editingProduct && (
        <Card.Content>
          <div className="cardRow">
            <div className="cardName">
              <h4>{product.product_name}</h4>
            </div>
            <Button.Group>
              <Button
                className="mainButton cardEditButton"
                onClick={() => setEditingProduct(true)}
              >
                Edit
              </Button>
              <Button className="mainButton cardDelButton" as={Link} to={"/acp/products/" + product.product_id + "/delete"}>Delete</Button>
            </Button.Group>
          </div>
        </Card.Content>
      )}
      {editingProduct && <Card.Content><ProductListCardEditForm product={product} setEditingProduct={setEditingProduct}/></Card.Content>}
    </Card>
  );
};

export default observer(ProductListCard);
