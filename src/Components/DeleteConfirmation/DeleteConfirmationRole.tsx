import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import Store from "../App/Store/rootStore";
import { Grid, GridColumn, Button, Form } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";

interface params {
  id: string;
}
const DeleteConfirmationRole: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const {
    loadCurrentRole,
    currentRole: role,
    deleteRole,
  } = store.userStore;

  useEffect(() => {
    //Logic goes here
    loadCurrentRole(match.params.id);
  }, [loadCurrentRole, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    deleteRole(match.params.id)
      .then(() => {
        history.push("/acp/roles");
      });
  };

  if (!role) return <div>404</div>;

  return (
    <div className="deleteConfirmBody">
      <Grid>
        <GridColumn width={12}>
          <h2>Role Deletion</h2>
        </GridColumn>
        <GridColumn width={3}>
          <Button
            className="mainButton"
            as={Link}
            to={"/acp/roles/" + match.params.id}
          >
            Back
          </Button>
        </GridColumn>
      </Grid>
      <hr />
      {role && (
        <div>
          <div>
            You're about to delete the role named "{role.name}" from the system.
            Are you sure you wish to proceed?
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

export default observer(DeleteConfirmationRole);
