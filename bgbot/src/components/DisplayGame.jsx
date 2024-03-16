import React, { useState, useEffect, useRef } from "react";
import App from "../App";

const DisplayGame = (props) => {
  //users
  const [gameNames, setGameNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState("");
  const [userName, setUserName] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const searchRef = useRef();


  const abortController = new AbortController();


  const getGame = async () => {
    event.preventDefault(); // Prevent the default form submission behavior
    const searchgame = searchRef.current.value;
    setGameNames([]);
   
    try {
       const req = new XMLHttpRequest();
       req.open(
         "GET",
         "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=" +
           searchgame,
         true
       );
       req.onload = async () => {
         if (req.status === 200) {
           const parser = new DOMParser();
           const xmlDoc = parser.parseFromString(req.responseText, "text/xml");
           const items = xmlDoc.getElementsByTagName("item");
           const names = await Promise.all(
             Array.from(items).map(async (item, i) => {
               const gameName = item
                 .getElementsByTagName("name")[0]
                 .getAttribute("value");
               const gameId = item.getAttribute("id"); // Extract the game ID
               const imgUrl = await props.getImageUrl(gameId);
               return {
                 name: `${i + 1}. ${gameName} (ID: ${gameId})`,
                 id: gameId,
                 imgUrl: imgUrl,
               };
             })
           );
   
           setGameNames(names);
         }
       };
       req.send(null);
    } catch (error) {
       console.error(error.message);
    }
   };
   



  const addGame = async () => {
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
        }
      );

      if (res.ok) {
        console.log("Game added successfully");
        //clear the form and hide the modal
        setUserName("");
        setUserGroup("");
        searchRef.current.value = "";
        setShowModal(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const addWishlist = async () => {
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
          method: "POST",
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              owner: userName,
              group: userGroup,
              gameid: parseInt(gameId),
              gamename: gameName,
              plays: 0,
              status: "wishlist",
              dateadded: dateAdded,
            },
            typecast:true,
          }),
        }
      );

      if (res.ok) {
        console.log("Game wishlist successfully");
        //clear the form and hide the modal
        setUserName("");
        setUserGroup("");
        searchRef.current.value = "";
        setShowModal(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const [recentGames, setRecentGames] = useState([]);
  const fetchGames = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?maxRecords=30&view=Grid%20view&sort%5B0%5D%5Bfield%5D=dateadded&sort%5B0%5D%5Bdirection%5D=desc",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246",
            "Content-Type": "application/json", 
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setRecentGames(data.records);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const delGame = async (recordId) => {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", 

            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Game deleted successfully");
        //refetch the recent games to update the UI
        fetchGames();
      } else {
        console.error("Failed to delete game", await response.text());
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  //use effects
  useEffect(() => {
    fetchGames();
    return () => {
      // Abort all ongoing fetch requests when the component unmounts
      abortController.abort();
    };
 }, []);

 
  return (
    <div className="container">
      <h1>Search or Add New Board Games: </h1>
      <br />
      <form>
        <div className="row">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search Game?"
            className="col-md-9"
          ></input>

          <button type="submit" className="col-md-3" onClick={getGame}>
            Search
          </button>
        </div>
      </form>

      <div id="gameNames">
        <br />
        {showModal && (
          <form onSubmit={getGame}>
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
              <br></br>
              <button type="submit" onClick={addGame}>
                Add to User
              </button>
              <button type="submit" onClick={addWishlist}>
                Add to Wishlist
              </button>
            </div>
          </form>
        )}
        <br />
        {gameNames.map((game, index) => (
        <div key={index}>
    <img src={game.imgUrl} alt={game.name} />
    <span>{game.name}</span>
    <button
      className="col-sm-1"
      onClick={() => {
        console.log(game.name);
        console.log(game.imgUrl)
        setSelectedGameName(game.name);
        setShowModal(true);
      }}
    >
      Add Game
    </button>
 </div>
))}

      </div>
      <br />
      <br />
      <h2>Recently Added Games:</h2>

      <div className="row">
        <div className="col-sm-5">boardgame</div>
        <div className="col-sm-1">gameid</div>
        <div className="col-sm-1">owner</div>
        <div className="col-sm-2">dateadded</div>
        <div className="col-sm-1">status</div>
      </div>
      {recentGames.map((game) => (
        <div key={game.id} className="row">
          <div className="col-sm-5">{game.fields.gamename}</div>
          <div className="col-sm-1">{game.fields.gameid}</div>
          <div className="col-sm-1">{game.fields.owner}</div>
          <div className="col-sm-2">{game.fields.dateadded}</div>
          <div className="col-sm-1">{game.fields.status}</div>
          <button className="col-sm-2" onClick={() => delGame(game.id)}>
            Delete Game
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayGame;
