import React from "react";
import styles from "./Book.module.css";

const Languages = (props) => {
  const deleteLanguage = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/hw/languages/" + props.language,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      props.getLangs();
    }
  };

  return (
    <>
      <div className={`row ${styles.book}`}>
        <div className="col-sm-4">{props.language}</div>
        <div className="col-sm-5">{props.created}</div>
        <button className="col-sm-3" onClick={deleteLanguage}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Languages;
