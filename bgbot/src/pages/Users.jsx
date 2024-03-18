import React from "react";
import DisplayUser from "../components/DisplayUser";

const Users = (props) => {
  return (
    <DisplayUser
    getImageUrl={props.getImageUrl}
    delGame={props.delGame}
    showUpdateModal={props.showUpdateModal}
    setShowUpdateModal={props.setShowUpdateModal}
    selectedGameDetails={props.selectedGameDetails}
    setSelectedGameDetails={props.setSelectedGameDetails}
    ></DisplayUser>
  );
};

export default Users;
