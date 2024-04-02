import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [groups, setGroups] = useState([]);

 useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(
          "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?sort%5B0%5D%5Bfield%5D=dateadded&fields%5B%5D=group&sort%5B0%5D%5Bdirection%5D=desc&filterByFormula=NOT%28%7Bgroup%7D%20%3D%20%27%27%29", //max 100 records.......
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", 
              "Content-Type": "application/json", 
            },
          
        });
        const data = await res.json();
        const uniqueGroups = [...new Set(data.records.flatMap(record => record.fields.group))];
        setGroups(uniqueGroups);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroups();
 }, []);






  return (
    <>
      <h1>Groups</h1>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <Link to={`/groups/${group}`}>{group}</Link>
          </li>
        ))}
      </ul>
    </>
 );
};

export default List;
