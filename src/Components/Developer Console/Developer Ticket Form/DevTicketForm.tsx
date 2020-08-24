import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import SelectInput from "../../Utility/Final Form Fields/DropdownInput";
import Store from "../../App/Store/rootStore";
import { Form, Button } from "semantic-ui-react";
import { ITicket } from "../../../Models/ticket";
import { ITicketForm } from "../../../Models/ticketForm";
import { useHistory } from "react-router-dom";

interface IProps {
  currentTicket : ITicket
}

const DevTicketForm: React.FC<IProps> = ({currentTicket}) => {
    
  const store = useContext(Store);

  const { statusOptions } = store.statusStore;
  const { isArchivedOptions } = store.commonStore;
  const {developerOptions} = store.userStore;
  const {manageTicket} = store.ticketStore;

  let history = useHistory();

  const handleFinalFormSubmit = (values: any) => {

    console.log(values);

    let ticketDataToAdd : ITicketForm = {
      status_id: values.status.status_id,
      developer_id: values.developer,
      is_archived: values.is_archived
    }

    console.log(ticketDataToAdd);

    manageTicket(currentTicket.post_id!, ticketDataToAdd).then(() => {
      history.push("/tickets/" + currentTicket.post_id);
    });
  };

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field
                inputLabel="Status"
                component={SelectInput}
                options={statusOptions}
                name="status"
                placeholder="Status"
                initialValue={currentTicket.status}
              />
              <Field
                inputLabel="Developer"
                component={SelectInput}
                options={developerOptions}
                name="developer"
                placeholder="Developer"
                initialValue={currentTicket.developer?.id}
              />
              <Field
                inputLabel="Category"
                component={SelectInput}
                options={isArchivedOptions}
                name="is_archived"
                placeholder="Category"
                initialValue={currentTicket.is_archived}
              />
            </Form.Group>
            <Button
              className="mainButton ticketNewSubmit devConsoleSubmit"
              type="submit"
            >
              Save
            </Button>
          </Form>
        );
      }}
    />
  );
};

export default DevTicketForm;
