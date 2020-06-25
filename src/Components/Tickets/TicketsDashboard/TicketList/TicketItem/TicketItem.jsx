import React from "react";
import {Grid} from "semantic-ui-react";
import "./ticketItem.css";
import StatusIcon from "../../../FilterByDashboard/Status/StatusIcon/SatusIcon"
import avatar from "../../../../../Assets/Images/avatar.png"

const ticketAvatarStyle = {
  backgroundImage: "url(" + avatar + ")"
}

const TicketItem = ({ ticket }) => {
  return (
    <Grid columns={6} className="ticketItem" stackable>
      <Grid.Column width={2}>
        <div class="ticketAvatar" style={ticketAvatarStyle}></div>
        {/* {ticket.author} */}
      </Grid.Column>
      <Grid.Column width={1}>
      {ticket.id}
      </Grid.Column>
      <Grid.Column width={3}>
        <div className="ticketStatusCol"><StatusIcon content={ticket.status}/></div>
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.product}
      </Grid.Column>
      <Grid.Column width={4}>
      {ticket.title}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.date}
      </Grid.Column>
    </Grid>
  );
};

export default TicketItem;
