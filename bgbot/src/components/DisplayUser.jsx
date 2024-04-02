import React, { useState, useEffect, useRef } from "react";
import UpdateModal from "./UpdateModal";

const DisplayUser = (props) => {
  //owners
  const [owners, setOwners] = useState([]);
  const fetchOwners = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?fields%5B%5D=owner&filterByFormula=NOT%28%7Bowner%7D%20%3D%20%27%27%29&sort%5B0%5D%5Bfield%5D=dateadded&sort%5B0%5D%5Bdirection%5D=desc", //max 100 records.......
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      const uniqueOwners = [
        ...new Set(data.records.map((record) => record.fields.owner)),
      ]; // Set automatically eliminates duplicates. spread array of owner values into a Set to remove duplicates, and then spread the Set back into an array ([...new Set(ownerValues)]).
      setOwners(uniqueOwners);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  const [selectedOwner, setSelectedOwner] = useState("");
  const [ownedGames, setOwnedGames] = useState([]);

  const handleOwnerChange = async (event) => {
    const selectedOwner = event.target.value;
    setSelectedOwner(selectedOwner);
    try {
      // Fetch games owned by the selected owner
      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?maxRecords=100&view=Grid%20view&filterByFormula=AND(owner='" +
          selectedOwner +
          "', status='owned')&sort%5B0%5D%5Bfield%5D=dateadded&sort%5B0%5D%5Bdirection%5D=desc", //max 100 records.......
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setOwnedGames(data.records);
    } catch (error) {
      console.error("Error fetching owned games:", error);
    }
  };

  //use effects
  useEffect(() => {
    const controller = new AbortController();
    fetchOwners();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container">
      {props.showUpdateModal && (
        <UpdateModal
          gameid={props.selectedGameDetails.gameid}
          gamename={props.selectedGameDetails.gamename}
          owner={props.selectedGameDetails.owner}
          group={props.selectedGameDetails.group}
          status={props.selectedGameDetails.status}
          recordid={props.selectedGameDetails.recordid}
          fetchGames={handleOwnerChange}
          setShowUpdateModal={props.setShowUpdateModal}
        />
      )}
      <h1>Users</h1>
      <h2>Select Owner:</h2>
      <select value={selectedOwner} onChange={handleOwnerChange}>
        <option value="">Select Owner</option>
        {owners.map((owner, index) => (
          <option key={index} value={owner}>
            {owner}
          </option>
        ))}
      </select>

      <h2>Owned Games:</h2>
      <div className="row">
        <div className="col-sm-1">image</div>
        <div className="col-sm-6">boardgame</div>
        <div className="col-sm-1">gameid</div>
      </div>
      <div>
        {ownedGames.map((game) => (
          <div key={game.id} className="row">
            <img
              className="col-sm-1"
              src={game.fields.imageurl}
              alt={game.fields.gamename}
            />

            <div className="col-sm-6">{game.fields.gamename}</div>
            <div className="col-sm-1">{game.fields.gameid}</div>

            <button className="col-sm-1" onClick={() => props.delGame(game.id)}>
              Delete
            </button>
            <button
              className="col-sm-1"
              onClick={() => {
                props.setSelectedGameDetails({
                  ...game.fields,
                  recordid: game.id, // Include the record ID here
                });
                props.setShowUpdateModal(true);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayUser;
