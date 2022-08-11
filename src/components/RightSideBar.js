import React, { useEffect } from "react";
import { getEllipsisTxt } from "../helpers/formatters";
import Chirping from "../assets/logos/ChirpingLogo.png";
import Wings from "../assets/logos/WingsYellow.png";
import Cages from "../assets/logos/CageYellow.png";
import Level from "../assets/logos/Level.png";

const RightSideBar = ({ currUser, setPromoteLevelModal, promoteLevel, promoteLevelCheck }) => {
  function togglePromoteLevel() {
    setPromoteLevelModal(true);
  }

  useEffect(() => {
    console.log(currUser);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "60vh",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {
          currUser ? 
        currUser.name.length === 0 ? <span className="text" style={{ fontSize: "32px" }}>
          {getEllipsisTxt(currUser.username, 6)}
        </span> : <span className="text" style={{ fontSize: "32px" }}>
          {currUser.name}
        </span> : <div></div> //loading
      }

        <div
          style={{
            display: "flex",
            height: "40vh",
            width: "60%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "40%",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              alt="Level"
              src={Level}
              style={{ width: "3rem", marginRight: "2rem" }}
              onClick={() => {console.log(promoteLevelCheck())}}
            ></img>
            <img
              alt="Chirpings"
              src={Chirping}
              style={{ width: "3.5rem", marginRight: "2rem" }}
            ></img>
            <img
              alt="Wings"
              src={Wings}
              style={{ width: "5.5rem", marginRight: "1.5rem" }}
            ></img>
            <img
              alt="Cages"
              src={Cages}
              style={{ width: "3rem", marginRight: "2rem" }}
            ></img>
          </div>
          {currUser ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "40%",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="rightSideBarText">
                {currUser.level.toNumber()}
              </span>
              <span className="rightSideBarText">
                {currUser.totalChirpings.toNumber()}
              </span>
              <span className="rightSideBarText">
                {currUser.totalWings.toNumber()}
              </span>
              <span className="rightSideBarText">
                {currUser.totalCages.toNumber()}
              </span>
            </div>
          ) : (
            <div></div> //loading
          )}
        </div>
      </div>
      {
        currUser ? promoteLevelCheck() ? <button
        className="normalButton"
        style={{ height: "2.5rem", width: "50%", marginTop: "1rem" }}
        onClick={() => {
          togglePromoteLevel();
          promoteLevel(currUser.username);
        }}
      >
        <span className="buttonText" style={{ fontSize: "24px" }}>
          Level Up
        </span>
      </button> : <button
        className="normalButtonNoHover"
        disabled={true}
        style={{ height: "2.5rem", width: "50%", marginTop: "1rem" }}
        onClick={() => {
          togglePromoteLevel();
          promoteLevel(currUser.username);
        }}
      >
        <span className="buttonText" style={{ fontSize: "24px" }}>
          Level Up
        </span>
      </button> : <div></div>
      }
      
    </div>
  );
};

export default RightSideBar;
