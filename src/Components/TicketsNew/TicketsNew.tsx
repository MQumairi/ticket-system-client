import React, { useContext, useState } from "react";
import "./ticketsNew.css";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductContext from "../../Components/App/Store/productStore";
import FilterStore from "../../Components/App/Store/filterStore";
import { ITicket } from "../../Models/ticket";
import TicketStore from "../App/Store/ticketStore"

const TicketsNew = () => {
  const productStore = useContext(ProductContext.ProductContext);
  const { productOptions } = productStore;

  const filterStore = useContext(FilterStore);
  const { statusOptions, filteredTickets } = filterStore;
  
  const ticketStore = useContext(TicketStore.TicketContext);
  const { tickets, addTicket } = ticketStore;

  const [status, setSatus] = useState("");
  const [product, setProduct] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("Title: " + e.currentTarget.ticketTitle.value);
    // console.log("Status: " + status);
    // console.log("Product " + product);
    // console.log("Description: " + e.currentTarget.ticketNewDesc.value);

    const today = new Date();

    let newTicket: ITicket = {
      author: "Admin",
      id: Math.floor(Math.random() * 10000),
      status: status,
      product: product,
      title: e.currentTarget.ticketTitle.value,
      description: e.currentTarget.ticketNewDesc.value,
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    }

    addTicket(newTicket);
    filteredTickets.push(newTicket);

    console.log(tickets)
    console.log(filteredTickets)
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
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Field>
            <label>Title</label>
            <input placeholder="Ticket Title" name="ticketTitle" />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              label="Status"
              options={statusOptions}
              placeholder="Select Status"
              onChange={(e, { value }) => {
                if(typeof(value) === "string") {
                  setSatus(value);
                }
              }}
            />
            <Form.Select
              fluid
              label="Product"
              options={productOptions}
              placeholder="Select Product"
              onChange={(e, { value }) => {
                if(typeof(value) === "string") {
                  setProduct(value);
                }
              }}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Describe your problem..."
            rows={10}
            name="ticketNewDesc"
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
