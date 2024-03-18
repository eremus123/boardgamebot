import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const gamenameRef = useRef();
  const gameidRef = useRef();
  const groupRef = useRef();
  const ownerRef = useRef();

  const updateGame = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameid: gameidRef.current.value,
        gamename: gamenameRef.current.value,
        owner: ownerRef.current.value,
        group: groupRef.current.value,
      }),
    });
    if (res.ok) {
      props.fetchGames();
      props.setShowUpdateModal(false);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Game Name</div>
          <input
            ref={gamenameRef}
            type="text"
            className="col-md-3"
            defaultValue={props.gamename}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">gameid</div>
          <input
            ref={gameidRef}
            type="text"
            className="col-md-3"
            defaultValue={props.gameid}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">group</div>
          <input
            ref={groupRef}
            type="text"
            className="col-md-3"
            defaultValue={props.group}
          />
          <div className="col-md-3"></div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">owner</div>
          <input
            ref={ownerRef}
            type="text"
            className="col-md-3"
            defaultValue={props.owner}
          />
          <div className="col-md-3"></div>
        </div>

          <br />

          <div className="row">
            <div className="col-md-3"></div>
            <button onClick={() => updateGame(props.recordid)} className="col-md-3">
              update
            </button>
            <button
              className="col-md-3"
              onClick={() => props.setShowUpdateModal(false)}
            >
              cancel
            </button>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          gameid={props.gameid}
          gamename={props.gamename}
          group={props.group}
          owner={props.owner}
          fetchGames={props.fetchGames}
          setShowUpdateModal={props.setShowUpdateModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
      ;
    </>
  );
};

export default UpdateModal;
