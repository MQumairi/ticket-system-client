import React from "react";
import { Button, Form } from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./ticketsNew.css";

const TicketsNew: React.FC<RouteComponentProps> = (props) => {

  // const store = useContext(Store);
  // const { productOptions } = store.productStore;
  // const { statusOptions } = store.filterStore;
  // const { addTicket } = store.ticketStore;

  // const [product, setProduct] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    // let newTicket: ITicket = {
    //   authorId: 1,
    //   id: Math.floor(Math.random() * 10000),
    //   status: status,
    //   product: product,
    //   title: e.currentTarget.ticketTitle.value,
    //   description: e.currentTarget.ticketNewDesc.value,
    //   date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    //   commentIds: []
    // }

    // addTicket(newTicket);
    // addTicket(newTicket);

    //Redirect
    props.history.push("/tickets");
    
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
            {/* <Form.Select
              fluid
              label="Status"
              options={statusOptions}
              placeholder="Select Status"
              onChange={(e, { value }) => {
                if(typeof(value) === "string") {
                  // setSatus(value);
                }
              }}
            /> */}
            {/* <Form.Select
              fluid
              label="Product"
              options={productOptions}
              placeholder="Select Product"
              onChange={(e, { value }) => {
                if(typeof(value) === "string") {
                  setProduct(value);
                }
              }}
            /> */}
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
