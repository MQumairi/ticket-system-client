import React, { useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import Store from "../App/Store/rootStore";
import { Grid, GridColumn, Button, Form } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";
import { IProduct } from "../../Models/product";
import LoadingComp from "../Utility/Loader/LoadingComp";

interface params {
  id: string;
}
const DeleteConfirmationProduct: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const { products, deleteProduct } = store.productStore;
  const { resourceLoading } = store.commonStore;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {

    let foundProduct = products.find((product) => {
      return product.product_id!.toString() === match.params.id;
    });

    if (foundProduct) setProduct(foundProduct);
  }, [products, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    setDeleting(true);
    deleteProduct(match.params.id)
    .then(() => {
      setDeleting(false);
    })
    .then(() => {
      history.push("/acp/products");
    });
  };

  if (resourceLoading || !product || !products)
    return (
      <div className="deleteConfirmBody">
        <LoadingComp loadingText="Loading" />
      </div>
    );

  return (
    <div className="deleteConfirmBody">
      <Grid>
        <GridColumn width={12}>
          <h2>Product Deletion</h2>
        </GridColumn>
        <GridColumn width={3}>
          <Button className="mainButton" as={Link} to={"/acp/products"}>
            Back
          </Button>
        </GridColumn>
      </Grid>
      <hr />
      {product && (
        <div>
          <div>
            You're about to delete the product "{product.product_name}" from the
            system. This will also delete any tickets and comments associated
            with it. Are you sure you wish to proceed?
          </div>

          <div className="deleteConfirmButtons">
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Button loading={deleting} className="mainButton" type="submit">
                      Delete
                    </Button>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(DeleteConfirmationProduct);
