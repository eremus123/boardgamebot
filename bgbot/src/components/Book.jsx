import React from "react";
import styles from "./Book.module.css";
import { useState, useEffect } from "react";
import UpdateModal from "./UpdateModal";

const Book = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const deleteUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: props.id }),
    });
    if (res.ok) {
      props.getUsers();
    }
  };

  const [userLanguages, setUserLanguages] = useState([]);
  const getUserLanguages = async (userId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + `/hw/users/languages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUserLanguages(data);
      } else {
        console.error("Error fetching user languages");
      }
    } catch (error) {
      console.error("error occurred:", error.message);
    }
  };

  const adduserLang = async () => {
    const lang = prompt("language to add:");
    if (lang) {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/hw/users/languages",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.id,
            language: lang,
          }),
        }
      );
      if (res.ok) {
        getUserLanguages(props.id);
      } else {
        console.log("error while adding user lang");
      }
    }
  };

  const deluserLang = async () => {
    const lang = prompt("language to delete:");
    if (lang) {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/hw/users/languages",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.id,
            language: lang,
          }),
        }
      );
      if (res.ok) {
        getUserLanguages(props.id);
      } else {
        console.log("error while deleting user lang");
      }
    }
  };

  useEffect(() => {
    getUserLanguages(props.id);
  }, [props.id]);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getUsers={props.getUsers}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={`row ${styles.book}`}>
        <div className="col-sm-2">{props.name}</div>
        <div className="col-sm-1">{props.age}</div>
        <div className="col-sm-2">{props.country}</div>
        <div className="col-sm-3">
          {userLanguages.map((lang) => (
            <span key={lang}>{lang}, </span>
          ))}
        </div>
        <button className="col-sm-1" onClick={deleteUser}>
          Delete User
        </button>
        <button className="col-sm-1" onClick={() => setShowUpdateModal(true)}>
          Update User
        </button>
        <button className="col-sm-1" onClick={adduserLang}>
          Add Game
        </button>
        <button className="col-sm-1" onClick={deluserLang}>
          Delete Game
        </button>
      </div>
    </>
  );
};

export default Book;
