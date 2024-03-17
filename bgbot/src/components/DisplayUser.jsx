import React, { useState, useEffect, useRef } from "react";
import Book from "./Book";

const DisplayUser = (props) => {
  //users
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const groupRef = useRef();

  const getUsers = async (signal) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users", {
        signal,
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const addUser = async () => {
    const name = nameRef.current.value;
    const group = groupRef.current.value;

    if (
      name.length >= 1 &&
      name.length <= 50 &&
      group.length >= 1 &&
      group.length <= 2

    ) {
      const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current.value,
          age: ageRef.current.value,
          group: groupRef.current.value,
        }),
      });
      if (res.ok) {
        getUsers();
        nameRef.current.value = "";
        ageRef.current.value = "";
        groupRef.current.value = "";
      } else {
        console.log("error occured");
      }
    }
  };

//owners
const [owners, setOwners] = useState([]);

const fetchOwners = async () => {
  try {
    const res = await fetch(
      "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?fields%5B%5D=owner&filterByFormula=NOT%28%7Bowner%7D%20%3D%20%27%27%29", //max 100 records.......
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", // Correctly set the Authorization header
          "Content-Type": "application/json", // Optionally set the Content-Type header if needed
        },
      }
    );
    const data = await res.json();
    const uniqueOwners = [...new Set(data.records.map((record) => record.fields.owner))]; // Set automatically eliminates duplicates. spread array of owner values into a Set to remove duplicates, and then spread the Set back into an array ([...new Set(ownerValues)]).
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
      "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?maxRecords=100&view=Grid%20view&filterByFormula=AND(owner='"+selectedOwner+"', status='owned')&fields%5B%5D=gameid&fields%5B%5D=gamename", //max 100 records.......
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", // Correctly set the Authorization header
          "Content-Type": "application/json", // Optionally set the Content-Type header if needed
        },
      }
    );
    const data = await res.json();
    setOwnedGames(data.records);
    console.log(selectedOwner, ownedGames)
  } catch (error) {
    console.error("Error fetching owned games:", error);
  }
};


  //use effects
  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller.signal);
    fetchOwners();

    return () => {
      controller.abort();
    };
  }, []);





  return (
    <div className="container">
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
      <div>
        {ownedGames.map((game) => (
          <div key={game.id}>
            {console.log("Game ID:", game.fields.gameid)}
            <img src={props.getImageUrl(155821)} alt={game.fields.gamename} />
            <span>{game.fields.gamename}</span>
          </div>))}
        </div>





      <div className="row">
        <input
          type="text"
          ref={nameRef}
          placeholder="name"
          className="col-md-3"
        ></input>

        <input
          type="text"
          ref={groupRef}
          placeholder="Group"
          className="col-md-3"
        ></input>

        <button className="col-md-4" onClick={addUser}>
          add user
        </button>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-2">name</div>
        <div className="col-sm-5">Board Games</div>
      </div>

      {users.map((item) => {
        return (
          <Book
            key={item.id}
            id={item.id}
            name={item.name}

            group={item.group}
            getUsers={getUsers}
          />
        );
      })}
    </div>
  );
};

export default DisplayUser;
