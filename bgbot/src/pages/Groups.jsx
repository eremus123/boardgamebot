import React from "react";
import { useParams } from "react-router-dom";

const Groups = () => {
  const params = useParams();
  return <h1>Group {params.id}</h1>;
};

export default Groups;
