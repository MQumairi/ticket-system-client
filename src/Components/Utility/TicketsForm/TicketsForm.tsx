import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import TextAreaInput from "../../Utility/Final Form Fields/TextAreaInput";
import SelectInput from "../../Utility/Final Form Fields/SelectInput";
import DropwdownInput from "../../Utility/Final Form Fields/DropdownInput";
import Store from "../../App/Store/rootStore";
import "./ticketsForm.css";
import { format } from "date-fns";
import { ITicketForm } from "../../../Models/ticketForm";
import { ITicket } from "../../../Models/ticket";
import { useHistory } from "react-router-dom";
import formBuilder from "../../../Functions/buildFormData";
import Dropzone from "../../Utility/Image Upload/Dropzone";

interface IProps {
  ticket?: ITicket;
}

const TicketsForm: React.FC<IProps> = (props) => {
  let history = useHistory();

  const store = useContext(Store);
  const { addTicket, currentTicket, editTicket } = store.ticketStore;
  const { productOptions } = store.productStore;
  const { statusOptions } = store.statusStore;
  const { user } = store.userStore;

  const [ticketToEdit, setTicketToEdit] = useState<ITicket | null>(null);

  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (!!props.ticket) {
      setTicketToEdit(currentTicket);
    } else {
    }
  }, [setTicketToEdit, currentTicket, props.ticket]);

  const handleFinalFormSubmit = (values: any) => {
    if (!props.ticket) {
      let ticketToPost: ITicketForm = {
        date_time: format(Date.now(), "MM/dd/yyyy h:m:s a"),
        description: values.description,
        author_id: user!.id,
        title: values.title,
        product_id: values.product.product_id,
        status_id: values.status.status_id,
        image: file,
      };

      let formData = formBuilder(ticketToPost);

      console.log(formData);

      addTicket(formData).then(() => {
        history.push("/tickets");
      });
    } else {
      let ticketToUpdate: ITicketForm = {
        post_id: props.ticket.post_id!.toString(),
        description: values.description,
        title: values.title,
        product_id: values.product.product_id,
        status_id: values.status.status_id,
      };

      editTicket(props.ticket.post_id!, formBuilder(ticketToUpdate)).then(() => {
        history.push("/tickets/" + props.ticket!.post_id);
      });
    }
  };

  return (
    <div id="ticketsNewContianer">
      <div id="ticketsNewHeader">
        {!props.ticket && <h1>Post New Ticket</h1>}
        {!!props.ticket && <h1>Edit Ticket</h1>}
        <div id="ticketsNewHeaderGap"></div>
        {!props.ticket && (
          <Button
            as={Link}
            to={"/"}
            className="mainButton backButton"
            content="Back"
          />
        )}
        {!!props.ticket && (
          <Button
            as={Link}
            to={"/tickets/" + props.ticket.post_id}
            className="mainButton backButton"
            content="Back"
          />
        )}
      </div>
      <div id="ticketsNewBody">
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Form content="Title"></Form>
                <Field
                  inputLabel="Title"
                  name="title"
                  placeholder="Ticket title"
                  component={TextInput}
                  initialValue={ticketToEdit?.title}
                />
                <Form.Group widths="equal">
                  <Field
                    inputLabel="Product"
                    component={DropwdownInput}
                    options={productOptions}
                    name="product"
                    defaultValue={ticketToEdit?.product}
                    placeholder="Product"
                  />
                  <Field
                    inputLabel="Status"
                    component={SelectInput}
                    options={statusOptions}
                    name="status"
                    defaultValue={ticketToEdit?.status}
                    placeholder="Status"
                  />
                </Form.Group>
                <Field
                  inputLabel="Description"
                  placeholder="Describe your problem..."
                  rows={10}
                  name="description"
                  component={TextAreaInput}
                  initialValue={ticketToEdit?.description}
                />
                <Dropzone setFile={setFile} defaultAttach={props.ticket?.attachment} />
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

export default observer(TicketsForm);
