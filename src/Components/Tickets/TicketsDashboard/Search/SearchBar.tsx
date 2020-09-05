import React from "react";
import "../ticketDashboard.css";
import { Form as FinalForm, Field } from "react-final-form";
import { Form } from "semantic-ui-react";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import { observer } from "mobx-react-lite";

interface IProps {
  loadSearchedTickets: (search_query: string) => Promise<void>,
  loadTickets: () => Promise<void>
}

const SearchBar:React.FC<IProps> = ({ loadSearchedTickets, loadTickets }) => {

  const handleFinalFormSubmit = (values: any) => {
    if (values.search_query) {
      loadSearchedTickets(values.search_query);
    } else {
      loadTickets();
    }
  };

  return (
    <div className="searchField">
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                name="search_query"
                placeholder="Search"
                component={TextInput}
              ></Field>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default observer(SearchBar);
