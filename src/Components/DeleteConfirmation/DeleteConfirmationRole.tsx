import React, { useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import Store from "../App/Store/rootStore";
import { Grid, GridColumn, Button, Form } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";
import LoadingComp from "../Utility/Loader/LoadingComp";

interface params {
  id: string;
}
const DeleteConfirmationRole: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const { loadCurrentRole, currentRole: role, deleteRole } = store.userStore;

  const { resourceLoading } = store.commonStore;

  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadCurrentRole(match.params.id);
  }, [loadCurrentRole, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    setDeleting(true);
    deleteRole(match.params.id)
    .then(() => {
      setDeleting(false);
    })
    .then(() => {
      history.push("/acp/roles");
    });
  };

  if (resourceLoading || !role)
    return (
      <div className="deleteConfirmBody">
        <LoadingComp loadingText="Loading"></LoadingComp>
      </div>
    );

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
                    <Button loading={deleting} className="mainButton" type="submit">
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
