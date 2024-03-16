import React, { useState, useEffect, useRef } from "react";
import Book from "./Book";

const DisplayUser = () => {
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


  //use effects
  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller.signal);

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
