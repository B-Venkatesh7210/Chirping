import React, { useState } from "react";
import { getEllipsisTxt } from "../helpers/formatters";

const RightSideBar = ({
  currUser,
  setPromoteLevelModal,
  promoteLevel,
}) => {
  function togglePromoteLevel() {
    setPromoteLevelModal(true);
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
          height: "60vh",
          width: "80%",
          background: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "start",
          marginTop: "2rem",
        }}
      >
        <span>{getEllipsisTxt(currUser.username, 6)}</span>
        <span>Chirpings: {currUser.totalChirpings}</span>
        <span>Wings: {currUser.totalWings}</span>
        <span>Cages: {currUser.totalCages}</span>
        <span>Level: {currUser.level}</span>
      </div>
      <div>
        <button
          onClick={() => {
            togglePromoteLevel();
            promoteLevel(currUser.username);
          }}
        >
          Promote Level
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
