import React, { useContext, useEffect, useState } from "react";
import Store from "../App/Store/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import "./ticketDetails.css";
import { Button, Label } from "semantic-ui-react";
import StatusIcon from "../Tickets/FilterByDashboard/Status/StatusIcon/SatusIcon";
import { observer } from "mobx-react-lite";
import Comment from "./Comment/Comment";
import defaultAvatar from "../../Assets/Images/defaultAvatar.png";
import CommentsForm from "./CommentsNew/CommentForm";
import { useHistory } from "react-router-dom";
import LoadingComp from "../Utility/Loader/LoadingComp";
import AuthorAvatar from "./AuthorAvatar";

interface params {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<params>> = ({ match }) => {
  let history = useHistory();

  //Import ticket store
  const store = useContext(Store);
  const { currentTicket, getTicket } = store.ticketStore;
  const { user } = store.userStore;
  const {
    ticketsFromProfile,
    setTicketsFromProfile,
    resourceLoading,
  } = store.commonStore;

  const [isReplying, setIsReplying] = useState<boolean>(false);

  useEffect(() => {
    getTicket(match.params.id);
  }, [getTicket, match.params.id]);

  const handleBack = () => {
    if (ticketsFromProfile) {
      setTicketsFromProfile(false);
      history.push("/profile/my-tickets");
    } else {
      if (currentTicket?.is_archived) {
        history.push("/archives");
      } else {
        history.push("/tickets");
      }
    }
  };

  if (resourceLoading || currentTicket == null)
    return (
      <div id="ticketDetailsBody">
        <div id="ticketDetailsMainPost">
          <LoadingComp loadingText="Loading Ticket"></LoadingComp>
        </div>
      </div>
    );

  return (
    <div id="ticketDetailsBody">
      <div id="ticketDetailsMainPost">

        {/* Header starts here */}
        <div className="ticketDetailsHeader">
          <div className="ticketHeaderTitle">
            <h1>{currentTicket.title}</h1>
            <div className="ticketDetailsButtons left">
              {user?.role && user.role.can_manage && (
                <Button
                  floated="right"
                  className="mainButton"
                  content="Manage"
                  as={Link}
                  to={
                    "/tickets/" + currentTicket.post_id + "/developer-console"
                  }
                />
              )}
              <Button
                floated="right"
                className="mainButton"
                content="Back"
                onClick={() => handleBack()}
              />
            </div>
          </div>
          <p className="postHeaderDate">{currentTicket.display_date}</p>
        </div>

        <hr />

        {/* Body starts here */}
        <div className="ticketBody">
          <div className="ticketMeta">
            <AuthorAvatar user={currentTicket.author} />
            <div className="productAndStatus">
              <StatusIcon status={currentTicket.status} clickAble={false} />
              <div className="productButton">
                {currentTicket.product.product_name}
              </div>
            </div>
          </div>
          <p className="description">{currentTicket.description}</p>
          {currentTicket.attachment && (
            <img
              alt={currentTicket.attachment.id}
              src={currentTicket.attachment.url}
            />
          )}
        </div>

        {/* Footer starts here */}

        <div className="ticketFooter">
          <div className="ticketDeveloper">
            {currentTicket.developer && (
              <Label as="a" image>
                {!currentTicket.developer.avatar && (
                  <img
                    alt={currentTicket.developer.username}
                    src={defaultAvatar}
                  />
                )}
                {currentTicket.developer.avatar && (
                  <img
                    alt={currentTicket.developer.username}
                    src={currentTicket.developer.avatar.url}
                  />
                )}
                Assigned to {currentTicket.developer.username}
              </Label>
            )}
          </div>

          <div className="ticketDetailsButtons left">
            {/* Delte button */}
            {user && (user!.id === currentTicket?.author.id ||
              user?.role?.can_moderate) && (
              <Button
                className="mainButton"
                as={Link}
                to={"/tickets/" + match.params.id + "/delete"}
              >
                Delete
              </Button>
            )}

            {/* Edit button */}
            {user &&
              (user!.id === currentTicket?.author.id ||
                user?.role?.can_moderate) && (
                <Button
                  className="mainButton"
                  as={Link}
                  to={"/tickets/" + match.params.id + "/edit"}
                >
                  Edit
                </Button>
              )}
          </div>
        </div>

        {/* <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={12}>
              {currentTicket.developer && (
                // <Label content={"Assigned to " + currentTicket.developer.username} />
                <Label as="a" image>
                  {!currentTicket.developer.avatar && (
                    <img
                      alt={currentTicket.developer.username}
                      src={defaultAvatar}
                    />
                  )}
                  {currentTicket.developer.avatar && (
                    <img
                      alt={currentTicket.developer.username}
                      src={currentTicket.developer.avatar.url}
                    />
                  )}
                  Assigned to {currentTicket.developer.username}
                </Label>
              )}
            </Grid.Column>
            {user && (
              <Grid.Column width={2}>
                {(user!.id === currentTicket?.author.id ||
                  user?.role?.can_moderate) && (
                  <Button
                    className="mainButton"
                    as={Link}
                    to={"/tickets/" + match.params.id + "/delete"}
                  >
                    Delete
                  </Button>
                )}
              </Grid.Column>
            )}
            {user && (
              <Grid.Column width={2}>
                {(user!.id === currentTicket?.author.id ||
                  user?.role?.can_moderate) && (
                  <Button
                    className="mainButton"
                    as={Link}
                    to={"/tickets/" + match.params.id + "/edit"}
                  >
                    Edit
                  </Button>
                )}
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid> */}


      </div>
      {/* {revealReplyForm()} */}
      {currentTicket.comments
        .slice()
        .sort((c1, c2) => Date.parse(c1.date_time) - Date.parse(c2.date_time))
        .map((comment) => {
          return (
            <Comment
              key={comment.post_id}
              parent_id={match.params.id}
              comment={comment}
            />
          );
        })}
      {user && !isReplying && (
        <Button
          className="mainButton commentButton"
          onClick={() => {
            setIsReplying(!isReplying);
          }}
        >
          Add Comment
        </Button>
      )}

      {isReplying && (
        <CommentsForm parent={currentTicket} setIsReplying={setIsReplying} />
      )}
    </div>
  );
};

export default observer(TicketDetails);
