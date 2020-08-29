import React, { useContext, useState } from "react";
import { IProduct } from "../../../../../Models/product";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../../Utility/Final Form Fields/TextInput";
import { Form as FinalForm, Field } from "react-final-form";
import Store from "../../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  product: IProduct;
  setEditingProduct: (editingProduct: boolean) => void;
}

const ProductListCardEditForm: React.FC<IProps> = ({
  product,
  setEditingProduct,
}) => {
  const store = useContext(Store);
  const { editProduct } = store.productStore;

    const [editing, setEditing] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setEditing(true);

    let productToEdit: IProduct = {
      product_name: values.name,
    };

    if (product) {
      editProduct(product.product_id!.toString(), productToEdit)
        .then(() => {
          product.product_name = productToEdit.product_name;
        })
        .then(() => {
          setEditing(false);
        })
        .then(() => {
          setEditingProduct(false);
        });
    }
  };
  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field
                name="name"
                placeholder="Product Name"
                component={TextInput}
                initialValue={product.product_name}
              />
              <Button loading={editing} className="mainButton" type="submit">
                Submit
              </Button>
              <Button
                className="mainButton"
                type="submit"
                onClick={() => setEditingProduct(false)}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    />
  );
};

export default observer(ProductListCardEditForm);
