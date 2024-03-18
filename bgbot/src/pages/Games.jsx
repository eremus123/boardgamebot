import React from "react";
import DisplayGame from "../components/DisplayGame";

const Games = (props) => {
  return (
    <DisplayGame
      getImageUrl={props.getImageUrl}
      delGame={props.delGame}
    ></DisplayGame>
  );
};

export default Games;
