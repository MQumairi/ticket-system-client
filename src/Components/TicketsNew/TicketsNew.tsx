import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Link, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TextInput from "../Utility/Final Form Fields/TextInput";
import TextAreaInput from "../Utility/Final Form Fields/TextAreaInput";
import SelectInput from "../Utility/Final Form Fields/SelectInput";
import Store from "../App/Store/rootStore";
import "./ticketsNew.css";
import { ITicket } from "../../Models/ticket";
import { format } from "date-fns";

const TicketsNew: React.FC<RouteComponentProps> = () => {
  const store = useContext(Store);
  const { productOptions } = store.productStore;
  const { statusOptions } = store.statusStore;
  const { currentUser } = store.userStore;

  const handleFinalFormSubmit = (values: any) => {
    let ticketToPost: ITicket = {
      date_time: format(Date.now(), "dd/MM/yyyy"),
      description: values.description,
      user: currentUser!,
      title: values.title,
      product: values.product,
      status: values.status,
      comments: []
    };
    console.log(ticketToPost);
  };

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
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Ticket title"
                  component={TextInput}
                ></Field>
                <Form.Group widths="equal">
                  <Field
                    component={SelectInput}
                    options={productOptions}
                    name="product"
                    placeholder="Product"
                  />
                  <Field
                    component={SelectInput}
                    options={statusOptions}
                    name="status"
                    placeholder="Status"
                  />
                </Form.Group>
                <Field
                  label="Description"
                  placeholder="Describe your problem..."
                  rows={10}
                  name="description"
                  component={TextAreaInput}
                />
                <Button className="mainButton ticketNewSubmit" type="submit">
                  Submit
                </Button>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default observer(TicketsNew);
