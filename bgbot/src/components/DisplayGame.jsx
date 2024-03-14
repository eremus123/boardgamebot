import React, { useState, useEffect, useRef } from "react";

const DisplayGame = () => {
  //users
  const [gameNames, setGameNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState("");
  const [userName, setUserName] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const searchRef = useRef();

  const getGame = async (signal) => {
    const searchgame = searchRef.current.value;
    setGameNames([]);

    try {
      const req = new XMLHttpRequest();
      req.open(
        "GET",
        "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/search?query=" +
          searchgame,
        true
      );
      req.onload = () => {
        if (req.status === 200) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(req.responseText, "text/xml");
          const items = xmlDoc.getElementsByTagName("item");
          const names = Array.from(items).map((item, i) => {
            const gameName = item
              .getElementsByTagName("name")[0]
              .getAttribute("value");
            const gameId = item.getAttribute("id"); // Extract the game ID
            return `${i + 1}. ${gameName} (ID: ${gameId})`; // Include the game ID in the output
          });

          setGameNames(names);
        }
      };
      req.send(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addGame = async (signal) => {
    try {
      // Extract the game ID from the selectedGameName string
      const gameIdMatch = selectedGameName.match(/\(ID: (\d+)\)/);
      const gameId = gameIdMatch ? gameIdMatch[1] : null; // Extract the game ID
      // Get the current date/time in ISO format
      const dateAdded = new Date().toISOString().split("T")[0];
      console.log(dateAdded);
      //Store only the game Name:
      const gameNameMatch = selectedGameName.match(/^\d+\.\s*(.*?)\s*\(/);
      const gameName = gameNameMatch ? gameNameMatch[1] : selectedGameName; // Use the extracted game name or the original string if no match

      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames",
        {
          method: "POST", // Specify the method if not 'GET'
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", // Correctly set the Authorization header
            "Content-Type": "application/json", // Optionally set the Content-Type header if needed
          },
          body: JSON.stringify({
            fields: {
              owner: userName,
              group: userGroup,
              gameid: parseInt(gameId),
              gamename: gameName,
              plays: 0,
              status: "owned",
              dateadded: dateAdded,
            },
          }),
          signal, // Pass the signal for aborting the request
        }
      );

      if (res.ok) {
        console.log("Game added successfully");
        // Optionally, clear the form and hide the modal
        setUserName("");
        setUserGroup("");
        setShowModal(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  //use effects
  useEffect(() => {
    const controller = new AbortController();
    getGame(controller.signal);
    addGame(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container">
      <h1>Search or Add New Board Games: </h1>
      <br />

      <div className="row">
        <input
          type="text"
          ref={searchRef}
          placeholder="Search Game?"
          className="col-md-9"
        ></input>

        <button className="col-md-3" onClick={getGame}>
          Search
        </button>
      </div>

      <div id="gameNames">
        <br />
        {showModal && (
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Group"
              value={userGroup}
              onChange={(e) => setUserGroup(e.target.value)}
            />
            <button onClick={addGame}>Submit</button>
          </div>
        )}
        <br />
        {gameNames.map((name, index) => {
          // Assuming the game ID is included in the name string and can be extracted
          const gameId = name.match(/\(ID: (\d+)\)/);
          return (
            <div key={gameId ? gameId[1] : index}>
              <span>{name}</span>
              <button
                onClick={() => {
                  console.log(name);
                  setSelectedGameName(name);
                  setShowModal(true);
                }}
              >
                Add
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <h2>Recently Added:</h2>

      <div className="row">
        <div className="col-sm-4">boardgame</div>
        <div className="col-sm-1">gameid</div>
        <div className="col-sm-2">owner</div>
        <div className="col-sm-3">dateadded</div>
        <div className="col-sm-2">status</div>
      </div>
    </div>
  );
};

export default DisplayGame;
