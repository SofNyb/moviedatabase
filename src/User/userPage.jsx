import React from "react";
import UserHero from "./UserHero.jsx";
import Bookmark from "./Bookmark.jsx";
import Rating from "./Rating.jsx";

const UserPage = () => {
  return (
    <div>
      <UserHero />
      <Bookmark />
      <Rating />
    </div>
  );
};

export default UserPage;
