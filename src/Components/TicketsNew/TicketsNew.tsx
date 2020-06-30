import React, { useContext, useEffect } from "react";
import "./ticketsNew.css";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductContext from "../../Components/App/Store/productStore"

const TicketsNew = () => {

  const productStore = useContext(ProductContext.ProductContext);
  const {productOptions} = productStore;

  const options = [
    { key: "U", text: "Urgent", value: "urgent" },
    { key: "L", text: "Low", value: "low" },
    { key: "P", text: "Pending", value: "pending" },
    { key: "D", text: "Done", value: "done" },
  ];

  return (
    <div id="ticketsNewContianer">
      <div id="ticketsNewHeader">
        <h1>Post New Ticket</h1>
        <div id="ticketsNewHeaderGap"></div>
        <Button as={Link} to={"/"} className="mainButton backButton">
          Back
        </Button>
      </div>
      <div id="ticketsNewBody">
        <Form>
          <Form.Field>
            <label>Title</label>
            <input placeholder="Ticket Title" />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              label="Status"
              options={options}
              placeholder="Select Status"
            />
            <Form.Select
              fluid
              label="Product"
              options={productOptions}
              placeholder="Select Product"
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Describe your problem..."
            rows={10}
          />
          <Button className="mainButton ticketNewSubmit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default observer(TicketsNew);
