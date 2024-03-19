import React, { useState, useEffect } from "react";

const HotGames = () => {
  const [hotGames, setHotGames] = useState([]);

  const fetchHotGames = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/hot?boardgame"
      );
      const text = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      const gamesList = Array.from(items).map((item, index) => ({
        rank: index + 1,
        name: item.getElementsByTagName("name")[0].getAttribute("value"),
        yearpublished: item
          .getElementsByTagName("yearpublished")[0]
          .getAttribute("value"),
        thumbnail: item
          .getElementsByTagName("thumbnail")[0]
          .getAttribute("value"),
      }));
      setHotGames(gamesList);
    } catch (error) {
      console.error("Error fetching hotgames:", error);
    }
  };

  useEffect(() => {
    fetchHotGames();
  }, []);

  return (
    <div className="games-container">
      {hotGames.map((game, index) => (
        <div key={index} className="game-card">
          <h5 className="game-rank">Rank: {game.rank}</h5>
          <h6 className="game-name">
            {game.name} (Published In: {game.yearpublished})
          </h6>
          <img src={game.thumbnail}></img>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default HotGames;
