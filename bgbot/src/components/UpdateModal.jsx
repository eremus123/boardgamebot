import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const gamenameRef = useRef();
  const gameidRef = useRef();
  const groupRef = useRef();
  const ownerRef = useRef();
  const statusRef = useRef();
  const recordId = props.recordid;
  const newdate = new Date().toISOString().split("T")[0];

  const updateGame = async () => {
    const res = await fetch(
      "https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames/" + recordId,
      {
        method: "PATCH",
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            gameid: parseInt(gameidRef.current.value),
            gamename: gamenameRef.current.value,
            owner: ownerRef.current.value,
            group: groupRef.current.value,
            status: statusRef.current.value,
            dateadded: newdate,
          },
          typecast: true,
        }),
      }
    );
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
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">status</div>
            <input
              ref={statusRef}
              type="text"
              className="col-md-3"
              defaultValue={props.status}
            />
            <div className="col-md-3"></div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-3"></div>
            <button
              onClick={() => updateGame(props.recordid)}
              className="col-md-3"
            >
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
          status={props.status}
          fetchGames={props.fetchGames}
          recordid={props.recordid}
          setShowUpdateModal={props.setShowUpdateModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
      ;
    </>
  );
};

export default UpdateModal;
