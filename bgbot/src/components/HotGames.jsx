import React, { useState, useEffect } from "react";

const HotGames = () => {
  const [hotGames, setHotGames] = useState([]);

  const FetchHotGames = async () => {
    try {
      const res = await fetch(
        "https://www.boardgamegeek.com/xmlapi2/hot?boardgame"
      );
      const text = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      const gamesList = Array.from(items).map((item, index) => {
        const nameElement = item.getElementsByTagName("name")[0];
        const yearPublishedElement =
          item.getElementsByTagName("yearpublished")[0];
        const thumbnailElement = item.getElementsByTagName("thumbnail")[0];

        return {
          rank: index + 1,
          name: nameElement ? nameElement.getAttribute("value") : "N/A",
          yearpublished: yearPublishedElement
            ? yearPublishedElement.getAttribute("value")
            : "N/A",
          thumbnail: thumbnailElement
            ? thumbnailElement.getAttribute("value")
            : "N/A",
        };
      });
      setHotGames(gamesList);
    } catch (error) {
      console.error("Error fetching hotgames:", error);
    }
  };

  useEffect(() => {
    FetchHotGames();
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
