import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import SelectInput from "../../Utility/Final Form Fields/DropdownInput";
import Store from "../../App/Store/rootStore";
import { Form, Button } from "semantic-ui-react";
import { ITicket } from "../../../Models/ticket";

interface IProps {
  currentTicket : ITicket
}

const DevTicketForm: React.FC<IProps> = ({currentTicket}) => {
    
  const store = useContext(Store);

  const { statusOptions } = store.statusStore;
  const { isArchivedOptions } = store.commonStore;
  const {developerOptions} = store.userStore;


  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
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
