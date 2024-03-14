import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <>
      <h1> Groups</h1>
      <ul>
        <li>
          <Link to="/groups/a">A</Link>
        </li>
        <li>
          <Link to="/groups/b">B</Link>
        </li>
        <li>
          <Link to="/groups/c">C</Link>
        </li>
      </ul>
    </>
  );
};

export default List;
