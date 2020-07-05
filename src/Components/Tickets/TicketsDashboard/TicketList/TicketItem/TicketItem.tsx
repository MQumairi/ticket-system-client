import React from "react";
import {Grid, Button} from "semantic-ui-react";
import "./ticketItem.css";
import {ITicket} from "../../../../../Models/ticket"
import StatusIcon from "../../../FilterByDashboard/Status/StatusIcon/SatusIcon"
import avatar from "../../../../../Assets/Images/avatar.png"
import { Link } from "react-router-dom";

interface IProps {
  ticket: ITicket;
}

const ticketAvatarStyle = {
  backgroundImage: "url(" + avatar + ")"
}

const TicketItem: React.FC<IProps> = ({ ticket }) => {
  return (
    <Grid columns={6} className="ticketItem" stackable>
      <Grid.Column width={2}>
        <div className="ticketAvatar" style={ticketAvatarStyle}></div>
        {/* {ticket.author} */}
      </Grid.Column>
      <Grid.Column width={3}>
        <div className="ticketStatusCol"><StatusIcon clickAble={false} content={ticket.status}/></div>
      </Grid.Column>
      <Grid.Column width={2}>
      {ticket.product}
      </Grid.Column>
      <Grid.Column width={4}>
      {ticket.title}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.date}
      </Grid.Column>
      <Grid.Column width={1}>
      <Button as={Link} to={"/tickets/" + ticket.id} className="mainButton">View</Button>
      </Grid.Column>
    </Grid>
  );
};

export default TicketItem;
