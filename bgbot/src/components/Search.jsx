import React, { useState } from "react";

const Search = (props) => {
 const [gameName, setGameName] = useState("");
 const [results, setResults] = useState([]);

 const searchGames = async () => {
    try {
        const res = await fetch(
            "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames?filterByFormula=AND(FIND('"+gameName+"', LOWER({gamename})) > 0, OR(FIND('"+props.group+"', {group})))", //max 100 records.......
            {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", 
                "Content-Type": "application/json", 
              },
            }
          );
      const data = await res.json();
      if (data.records.length===0) {
        setResults([{ message: "This game is not owned/wishlisted by this group." }]);
      } else {
        setResults(data.records);
      }
    } catch (err) {
      console.error(err);
    }
 };

 return (
    <div>
      <input
        type="text"
        placeholder="Search for a game"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={searchGames}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}><img src={result.fields.imageurl} />
            {`${result.fields.gamename} (${result.fields.status} by ${result.fields.owner})`}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default Search;