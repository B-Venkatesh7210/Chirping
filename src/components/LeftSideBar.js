import React from "react";
import { NavLink, Link } from "react-router-dom";

const LeftSideBar = ({ currUser, setChirpingModal, setNavStatus, navStatus }) => {

  function chirpingModalToggle() {
    setChirpingModal(true);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <div
        style={{
          height: "50vh",
          width: "80%",
          background: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "2rem"
        }}
      >
        <NavLink to="/" onClick={() => {setNavStatus({home: true, myChirpings: false, myCagedChirpings: false, myProfile: false})}}>Home</NavLink>
        <NavLink to="/" onClick={() => {setNavStatus({home: false, myChirpings: true, myCagedChirpings: false, myProfile: false})}}>My Chirpings</NavLink>
        <NavLink to="/" onClick={() => {setNavStatus({home: false, myChirpings: false, myCagedChirpings: true, myProfile: false})}}>My Caged Chirpings</NavLink>
        <NavLink to="/" onClick={() => {setNavStatus({home: false, myChirpings: false, myCagedChirpings: false, myProfile: true})}}>My Profile</NavLink>
      </div>
      <div>
        <button onClick={chirpingModalToggle}>Chirp !</button>
      </div>
    </div>
  );
};

export default LeftSideBar;
