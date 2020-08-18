import React, { useContext } from "react";
import "./myTickets.css";
import Store from "../../App/Store/rootStore";
import TicketItemSmall from "./TicketItemSmall/TicketItemSmall";
import { useHistory } from "react-router-dom";

const MyTickets = () => {
  let history = useHistory();

  const store = useContext(Store);
  const { devTicketsRegistry } = store.userStore;
  const {setTicketsFromProfile} = store.commonStore;

  return (
    <div className="myTickets">
      {console.log(devTicketsRegistry.size)}
      {Array.from(devTicketsRegistry).map(([key, ticket]) => {
        return (
          <button
            onClick={() => {
                setTicketsFromProfile(true);
                history.push("/tickets/" + ticket.post_id);
            }}
          >
            <TicketItemSmall ticket={ticket} key={key} />
          </button>
        );
      })}
    </div>
  );
};

export default MyTickets;
