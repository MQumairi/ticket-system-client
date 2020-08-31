import React from "react";
import Profile from "../Profile";
import MyTickets from "./MyTickets";

const MyTicketsPage = () => {
  return (
    <Profile currentPage="My Tickets">
      <MyTickets />
    </Profile>
  );
};

export default MyTicketsPage;
