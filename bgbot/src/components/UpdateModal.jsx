import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const updateUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/hw/users/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });
    if (res.ok) {
      props.getUsers();
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
          <div className="col-md-3">Name</div>
          <input
            ref={nameRef}
            type="text"
            className="col-md-3"
            defaultValue={props.name}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Age</div>
          <input
            ref={ageRef}
            type="text"
            className="col-md-3"
            defaultValue={props.age}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Country</div>
          <input
            ref={countryRef}
            type="text"
            className="col-md-3"
            defaultValue={props.country}
          />
          <div className="col-md-3"></div>

          <br />

          <div className="row">
            <div className="col-md-3"></div>
            <button onClick={() => updateUser(props.id)} className="col-md-3">
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
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getUsers={props.getUsers}
          setShowUpdateModal={props.setShowUpdateModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
      ;
    </>
  );
};

export default UpdateModal;
