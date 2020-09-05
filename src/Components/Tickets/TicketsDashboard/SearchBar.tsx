import React, { useContext } from "react";
import "./ticketDashboard.css";
import { Form as FinalForm, Field } from "react-final-form";
import { Form } from "semantic-ui-react";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import Store from "../../App/Store/rootStore";

const SearchBar = () => {
  const store = useContext(Store);
  const { loadSearchedTickets, loadTickets } = store.ticketStore;

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

export default SearchBar;
