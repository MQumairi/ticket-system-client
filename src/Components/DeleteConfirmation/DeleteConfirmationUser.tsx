import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Store from "../App/Store/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";
import LoadingComp from "../Utility/Loader/LoadingComp";

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
    loadUserList,
  } = store.userStore;

  const { resourceLoading } = store.commonStore;

  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadInspectedUser(match.params.id);
  }, [loadInspectedUser, match.params]);

  const handleFinalFormSubmit = (values: any) => {
    setDeleting(true);
    deleteUser(match.params.id)
      .then(() => {
        loadUserList();
      })
      .then(() => {
        setDeleting(false);
      })
      .then(() => {
        history.push("/acp/users/");
      });
  };

  if (resourceLoading)
    return (
      <div className="deleteConfirmBody">
        <LoadingComp loadingText="Loading"></LoadingComp>
      </div>
    );

  if (user == null || !user.role || user.role.name !== "Admin")
    return <div>Error 403</div>;

  return (
    <div className="deleteConfirmBody">

      <div className="deleteConfirmHead">
        <h2>User Deletion</h2>
        <div className="backButton left">
          <Button
            className="mainButton"
            as={Link}
            to={"/acp/users/" + match.params.id}
            content="Back"
          />
        </div>
      </div>

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
                    <Button
                      className="mainButton"
                      type="submit"
                      loading={deleting}
                    >
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
