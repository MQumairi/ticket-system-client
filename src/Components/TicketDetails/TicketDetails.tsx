import React, { useContext, useState, useEffect } from "react";
import Store from "../App/Store/rootStore";
import { ITicket } from "../../Models/ticket";
import { RouteComponentProps, Link } from "react-router-dom";
import "./ticketDetails.css";
import { Grid, Button } from "semantic-ui-react";
import StatusIcon from "../Tickets/FilterByDashboard/Status/StatusIcon/SatusIcon";
import Avatar from "../Users/Avatar/Avatar";
import { observer } from "mobx-react-lite";
import CommentsNew from "./CommentsNew/CommentsNew";
import { IComment } from "../../Models/comment";
import Comment from "./Comment/Comment";

interface params {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<params>> = ({ match, history }) => {
  const store = useContext(Store);
  const { getTicket, deleteTicket, ticketsRegistry } = store.ticketStore;

  const [replyPressed, setReplyPressed] = useState(false);

  const [currentTicket, setCurrentTicket] = useState<ITicket | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentTicket(getTicket(match.params.id));
  }, [getTicket, match.params.id]);

  if (currentTicket === undefined) return <div>Error 404</div>;

  // const poster = getUser("2980dd9d-26ad-46b3-baa9-01276ff20162");

  const revealReplyForm = () => {
    if (replyPressed) return <CommentsNew parent={currentTicket} setReplyPressed={setReplyPressed} />;
  };

  const setReplyText = () => {
    if (replyPressed) return "Cancel";
    return "Reply";
  };

  //Array for the comments on this ticket
  let comments: IComment[] = currentTicket.commnets;

  //Delete ticket
  const handleDelete = () => {
    deleteTicket(currentTicket.post_id!);

    console.log("----------------")
    console.log("From TicketDetails's handleDelete")
    console.log(ticketsRegistry.size);

    history.push("/tickets");
  }
  return (
    <div id="ticketDetailsBody">
      <div id="ticketDetailsMainPost">
        {/* Header starts here */}
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>{currentTicket?.title}</h1>
              <p className="postHeaderDate">{currentTicket.date_time}</p>
            </Grid.Column>
            <Grid.Column>
              <Button
                as={Link}
                to="/tickets"
                floated="right"
                className="mainButton"
                content="Back"
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
                avatar={currentTicket.user.avatar!}
                diameter={80}
                borderWidth={4}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <h2 className="posterName">
                {currentTicket.user.username}
              </h2>
              <h4 className="posterRank">Rank Here</h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <StatusIcon status={currentTicket.status} clickAble={false} />
              <div className="productButton">{currentTicket.product}</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <p>{currentTicket?.description}</p>
          </Grid.Row>
        </Grid>
        {/* Footer starts here */}
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={12}>
              <Button
                className="mainButton"
                onClick={() => setReplyPressed(!replyPressed)}
              >
                {setReplyText()}
              </Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className="mainButton" onClick={handleDelete}>Delete</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className="mainButton">Edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      {revealReplyForm()}
      {comments.map((comment) => {
        return <div>
          <Comment comment={comment}/>
          </div>;
      })}
    </div>
  );
};

export default observer(TicketDetails);
