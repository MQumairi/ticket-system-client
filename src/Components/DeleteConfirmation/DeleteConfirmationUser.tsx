import React, { useContext, useEffect } from "react";
import { Button, Grid, GridColumn, Form } from "semantic-ui-react";
import Store from "../App/Store/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";

interface params {
  id: string;
}

const DeleteConfirmationUser: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const {
    user,
    inspectedUser,
    loadInspectedUser,
    deleteUser,
    loadUserList
  } = store.userStore;

  useEffect(() => {
    loadInspectedUser(match.params.id);
  }, [loadInspectedUser, match.params]);

  const handleFinalFormSubmit = (values: any) => {
    console.log("Pressed");
    deleteUser(match.params.id)
    .then(() => {
        loadUserList();
    })
    .then(() => {
      history.push("/admin-console");
    });
  };

  if (user == null || user.roles == null || !user.roles.includes("Admin"))
    return <div>Error 403</div>;

  return (
    <div className="deleteConfirmBody">
      <Grid>
        <GridColumn width={10}>
          <h2>User Deletion</h2>
        </GridColumn>
        <GridColumn width={2} />
        <GridColumn width={2}>
          <Button className="mainButton" as={Link} to={"/acp/users/" + match.params.id}>
            Back
          </Button>
        </GridColumn>
      </Grid>
      <hr />
      {inspectedUser && (
        <div>
          <div>
            You're about to delete the account of {inspectedUser!.username} from
            the system. This will also remove all tickets, comments, and images
            associated with them. Do you wish to proceed?
          </div>

          <div className="deleteConfirmButtons">
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Button className="mainButton" type="submit">
                      Delete
                    </Button>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(DeleteConfirmationUser);
