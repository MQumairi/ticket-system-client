import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import "./deleteconfirm.css";
import { Button, Grid, GridColumn, Form } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import LoadingComp from "../Utility/Loader/LoadingComp";

interface params {
  id: string;
}

const DeleteConfirm: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const { currentTicket, getTicket, deleteTicket } = store.ticketStore;
  const {resourceLoading} = store.commonStore;

  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    getTicket(match.params.id);
  }, [getTicket, match.params.id]);

  const handleFinalFormSubmit = () => {
    setDeleting(true);
    deleteTicket(match.params.id)
    .then(() => {
      setDeleting(false);
    })
    .then(() => {
      history.push("/tickets");
    });
  };

  if (resourceLoading || currentTicket == null) return <div className="deleteConfirmBody"><LoadingComp loadingText="Loading"></LoadingComp></div>;

  return (
    <div className="deleteConfirmBody">
      <Grid>
        <GridColumn width={10}>
          <h2>Ticket Deletion</h2>
        </GridColumn>
        <GridColumn width={2} />
        <GridColumn width={2}>
          <Button
            className="mainButton"
            as={Link}
            to={"/tickets/" + match.params.id}
          >
            Back
          </Button>
        </GridColumn>
      </Grid>
      <hr />
      <div className="deleteConfirmText">
        Are you sure you want to delete the ticket titled "
        <b>{currentTicket?.title}</b>
        "? This cannot be undone.
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
  );
};

export default observer(DeleteConfirm);
