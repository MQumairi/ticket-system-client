import React, { useContext, useEffect, useState } from "react";
import Store from "../App/Store/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import "./ticketDetails.css";
import { Grid, Button, Label } from "semantic-ui-react";
import StatusIcon from "../Tickets/FilterByDashboard/Status/StatusIcon/SatusIcon";
import Avatar from "../Users/Avatar/Avatar";
import { observer } from "mobx-react-lite";
import Comment from "./Comment/Comment";
import defaultAvatar from "../../Assets/Images/defaultAvatar.png";
import CommentsForm from "./CommentsNew/CommentForm";
import { useHistory } from "react-router-dom";
import LoadingComp from "../Utility/Loader/LoadingComp";

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
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={12}>
              <h1>{currentTicket.title}</h1>
              <p className="postHeaderDate">{currentTicket.display_date}</p>
            </Grid.Column>
            <Grid.Column width={2}>
              {user?.role && user.role.can_manage && (
                <Button
                  floated="right"
                  className="mainButton devButton"
                  content="Manage"
                  as={Link}
                  to={
                    "/tickets/" + currentTicket.post_id + "/developer-console"
                  }
                />
              )}
            </Grid.Column>
            <Grid.Column width={2}>
              <Button
                floated="right"
                className="mainButton"
                content="Back"
                onClick={() => handleBack()}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <hr />
        {/* Body starts here */}
        <Grid id="ticketDetailsMainPostContent">
          <Grid.Row columns={3}>
            <Grid.Column width={2}>
              <Avatar
                avatar={currentTicket.author.avatar}
                diameter={80}
                borderWidth={4}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <h2 className="posterName">{currentTicket.author.username}</h2>
              <h4 className="posterRank">
                {currentTicket.author.role && currentTicket.author.role.name}
              </h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <StatusIcon status={currentTicket.status} clickAble={false} />
              <div className="productButton">
                {currentTicket.product.product_name}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <p className="description">{currentTicket.description}</p>
          </Grid.Row>
          {currentTicket.attachment && (
            <Grid.Row>
              <img
                alt={currentTicket.attachment.id}
                src={currentTicket.attachment.url}
              />
            </Grid.Row>
          )}
        </Grid>
        {/* Footer starts here */}
        <Grid>
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
        </Grid>
      </div>
      {/* {revealReplyForm()} */}
      {currentTicket.comments
        .slice().sort((c1, c2) => Date.parse(c1.date_time) - Date.parse(c2.date_time))
        .map((comment) => {
          return (
              <Comment key={comment.post_id} parent_id={match.params.id} comment={comment} />
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
