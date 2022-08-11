import React, { useState, useEffect } from "react";
import Chirping from "../assets/logos/ChirpingLogo.png";
import Wings from "../assets/logos/WingsYellow.png";
import Cages from "../assets/logos/CageYellow.png";
import Level from "../assets/logos/Level.png";
import { getEllipsisTxt } from "../helpers/formatters";
import AllChirpings from "./AllChirpings";

const CreatorProfile = ({ currCreator }) => {
  const [currentCreator, setCurrentCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      const creatorData = await currCreator();
      setCurrentCreator(creatorData);
    };
    setIsLoading(true);
    getUserData();
    setIsLoading(false);
  }, []);

  if (isLoading || !currentCreator) return <div>loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            margin: "0rem 2rem",
          }}
        >
          <img
            alt="Level"
            src={Level}
            style={{ width: "4rem", marginRight: "1rem" }}
          ></img>
          <span className="rightSideBarText" style={{ fontSize: "4rem" }}>
            {currentCreator.level.toNumber()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            margin: "0rem 2rem",
          }}
        >
          <img
            alt="Total Chirpings"
            src={Chirping}
            style={{ width: "4rem", marginRight: "1rem" }}
          ></img>
          <span className="rightSideBarText" style={{ fontSize: "4rem" }}>
            {currentCreator.totalChirpings.toNumber()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            margin: "0rem 2rem",
          }}
        >
          <img
            alt="Total Wings"
            src={Wings}
            style={{ width: "7rem", marginRight: "1rem" }}
          ></img>
          <span className="rightSideBarText" style={{ fontSize: "4rem" }}>
            {currentCreator.totalWings.toNumber()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            margin: "0rem 2rem",
          }}
        >
          <img
            alt="Total Cages"
            src={Cages}
            style={{ width: "4rem", marginRight: "1rem" }}
          ></img>
          <span className="rightSideBarText" style={{ fontSize: "4rem" }}>
            {currentCreator.totalCages.toNumber()}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "6rem",
        }}
      >
        <div
          className="displayPicture2"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            transform: "scale(1.5)"
          }}
        >
          <img
            alt="Profile"
            src={currentCreator.displayPicture}
            style={{
              width: "8rem",
              height: "8rem",
              borderRadius: "100%",
            }}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "14rem",
              height: "8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {currentCreator.name.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span className="text" style={{ fontSize: "40px" }}>
                  {getEllipsisTxt(currentCreator.username, 6)}
                </span>
                {/* <span className="text" style={{ fontSize: "40px" }}>
                    Name
                  </span> */}
              </div>
            ) : (
              <span className="text" style={{ fontSize: "40px" }}>
                {currentCreator.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
