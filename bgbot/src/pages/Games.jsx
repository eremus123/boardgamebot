import React from "react";
import DisplayGame from "../components/DisplayGame";

const Games = (props) => {
  return <DisplayGame getImageUrl={props.getImageUrl}></DisplayGame>;
};

export default Games;
