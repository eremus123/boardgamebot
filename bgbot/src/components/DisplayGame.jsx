import React, { useState, useEffect, useRef } from "react";
import Book from "./Book";
import Languages from "./Languages";

const DisplayGame = () => {
  //users
  const [users, setUsers] = useState([]);
  const gameidRef = useRef();
  const gameRef = useRef();
  const ownerRef = useRef();
  const playsRef = useRef();
  const groupRef = useRef();
  const statusRef = useRef();

  const getGame = async (signal) => {
    const gameid = gameidRef.current.value;

    try {
      var req = new XMLHttpRequest();
      req.open(
        "GET",
        "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=" +
          gameid,
        false
      );
      req.send(null);
      console.log(req.responseText);
      if (req.ok) {
        // const data = await res.json();
        // setUsers(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getUsers = async (signal) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames",
        {
          method: "GET", // Specify the method if not 'GET'
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246", // Correctly set the Authorization header
            "Content-Type": "application/json", // Optionally set the Content-Type header if needed
          },
          signal, // Pass the signal for aborting the request
        }
      );

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
    const age = ageRef.current.value;
    const country = countryRef.current.value;

    if (
      name.length >= 1 &&
      name.length <= 50 &&
      country.length >= 1 &&
      country.length <= 50 &&
      parseInt(age) !== NaN &&
      parseInt(age) > 0
    ) {
      const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current.value,
          age: ageRef.current.value,
          country: countryRef.current.value,
        }),
      });
      if (res.ok) {
        getUsers();
        nameRef.current.value = "";
        ageRef.current.value = "";
        countryRef.current.value = "";
      } else {
        console.log("error occured");
      }
    }
  };

  //languages
  const [langs, setLangs] = useState([]);
  const langRef = useRef();

  const getLangs = async (signal) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/hw/languages", {
        signal,
      });

      if (res.ok) {
        const data = await res.json();
        setLangs(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const addLang = async () => {
    const lang = langRef.current.value;

    if (lang.length >= 1 && lang.length <= 20) {
      const res = await fetch(import.meta.env.VITE_SERVER + "/hw/languages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: langRef.current.value,
        }),
      });
      if (res.ok) {
        getLangs();
        langRef.current.value = "";
      } else {
        console.log("error occured");
      }
    }
  };

  //use effects
  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller.signal);
    getLangs(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container">
      <h1>Board Games</h1>

      <div className="row">
        <input
          type="text"
          ref={langRef}
          placeholder="new game"
          className="col-md-9"
        ></input>

        <button className="col-md-3" onClick={addLang}>
          add game
        </button>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-4">boardgame</div>
        <div className="col-sm-1">gameid</div>
        <div className="col-sm-2">owner</div>
        <div className="col-sm-3">dateadded</div>
        <div className="col-sm-2">status</div>
      </div>
      {langs.map((item) => {
        return (
          <Languages
            language={item.language}
            created={item.created_at}
            getLangs={getLangs}
          />
        );
      })}
    </div>
  );
};

export default DisplayGame;
