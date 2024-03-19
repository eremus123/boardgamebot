import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Search from "../components/Search";

const Groups = () => {
  const params = useParams();
  const [groupGames, setGroupGames] = useState([]);
  const fetchGroupGames = async () => {
    try {
      // Fetch games owned by the selected group
      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?view=Grid%20view&sort%5B0%5D%5Bfield%5D=dateadded&maxRecords=100&filterByFormula=AND(OR(FIND('" +
          params.id +
          "', {group})), status='owned')&sort%5B0%5D%5Bdirection%5D=desc", //max 100 records.......
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setGroupGames(data.records);
    } catch (error) {
      console.error("Error fetching owned games:", error);
    }
  };

  useEffect(() => {
    fetchGroupGames();
  }, []);

  return (
    <div className="container">
      <h2>Search for a game within group {params.id}:</h2>
      <Search group={params.id}></Search>

      <h2>Browse through all games in group ({params.id}):</h2>
      <div className="row">
        <div className="col-sm-1">image</div>
        <div className="col-sm-6">boardgame</div>
        <div className="col-sm-1">owner</div>

        {groupGames.map((game) => (
          <div key={game.id} className="row">
            <img className="col-sm-1" src={game.fields.imageurl} />
            <div className="col-sm-6">{game.fields.gamename}</div>
            <div className="col-sm-1">{game.fields.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
