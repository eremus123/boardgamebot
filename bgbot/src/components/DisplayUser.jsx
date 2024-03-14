import React, { useState, useEffect, useRef } from "react";
import Book from "./Book";
import Languages from "./Languages";

const DisplayUser = () => {
  //users
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

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
      <h1>Users</h1>
      <div className="row">
        <input
          type="text"
          ref={nameRef}
          placeholder="name"
          className="col-md-3"
        ></input>
        <input
          type="text"
          ref={ageRef}
          placeholder="age"
          className="col-md-2"
        ></input>
        <input
          type="text"
          ref={countryRef}
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
        <div className="col-sm-1">age</div>
        <div className="col-sm-2">Group</div>
        <div className="col-sm-5">Board Games</div>
      </div>

      {users.map((item) => {
        return (
          <Book
            key={item.id}
            id={item.id}
            name={item.name}
            age={item.age}
            country={item.country}
            getUsers={getUsers}
          />
        );
      })}
    </div>
  );
};

export default DisplayUser;
