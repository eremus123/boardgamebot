import React from "react";
import DisplayUser from "../components/DisplayUser";

const Users = (props) => {
  return (
    <DisplayUser
      getImageUrl={props.getImageUrl}
      delGame={props.delGame}
    ></DisplayUser>
  );
};

export default Users;
