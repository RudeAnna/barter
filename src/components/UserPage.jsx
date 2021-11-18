import React from "react";
import "../user-page.css";
import BartersList from "./BartersList";
import UserPageHeader from "./UserPageHeader";


const UserPage = () => {
  return (
    <div>
      <UserPageHeader />
      <BartersList />
    </div>
  );
};

export default UserPage;
