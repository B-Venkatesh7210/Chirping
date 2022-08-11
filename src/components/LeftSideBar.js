import React from "react";
import { NavLink, Link } from "react-router-dom";
import Home from "../assets/logos/Home.png";
import ChirpingLogoNone from "../assets/logos/ChirpingLogoNone.png";
import Cage from "../assets/logos/Cage.png";
import MyProfile from "../assets/logos/MyProfile.png";
import MyProfileYellow from "../assets/logos/MyProfileYellow.png";
import CageYellow from "../assets/logos/CageYellow.png";
import ChirpingLogoYellow from "../assets/logos/ChirpingLogo.png";
import HomeYellow from "../assets/logos/HomeYellow.png";

const LeftSideBar = ({
  currUser,
  setChirpingModal,
  setNavStatus,
  navStatus,
}) => {
  function chirpingModalToggle() {
    setChirpingModal(true);
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "70%",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "start",
          marginTop: "1rem",
        }}
      >
        <NavLink
          to="/home"
          className={navStatus.home ? "activeTab" : "nonActiveTab"}
          onClick={() => {
            setNavStatus({
              home: true,
              myChirpings: false,
              myCagedChirpings: false,
              myProfile: false,
              creatorProfile: false
            });
          }}
        >
          {navStatus.home ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img alt="Home" src={HomeYellow} style={{ width: "2rem" }}></img>
              <span className="tabText">Home</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img alt="Home" src={Home} style={{ width: "2rem" }}></img>
              <span className="tabText">Home</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/myChirpings"
          className={navStatus.myChirpings ? "activeTab" : "nonActiveTab"}
          onClick={() => {
            setNavStatus({
              home: false,
              myChirpings: true,
              myCagedChirpings: false,
              myProfile: false,
              creatorProfile: false
            });
          }}
        >
          {navStatus.myChirpings ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img
                alt="Chirping Logo none"
                src={ChirpingLogoYellow}
                style={{ width: "2rem" }}
              ></img>
              <span className="tabText">My Chirpings</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img
                alt="Chirping Logo none"
                src={ChirpingLogoNone}
                style={{ width: "2rem" }}
              ></img>
              <span className="tabText">My Chirpings</span>
            </div>
          )}
        </NavLink>
        <NavLink
          to="/caged"
          className={navStatus.myCagedChirpings ? "activeTab" : "nonActiveTab"}
          onClick={() => {
            setNavStatus({
              home: false,
              myChirpings: false,
              myCagedChirpings: true,
              myProfile: false,
              creatorProfile: false
            });
          }}
        >
          {navStatus.myCagedChirpings ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img alt="Cage" src={CageYellow} style={{ width: "2rem" }}></img>
              <span className="tabText">Caged</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <img alt="Cage" src={Cage} style={{ width: "2rem" }}></img>
              <span className="tabText">Caged</span>
            </div>
          )}
        </NavLink>
        <NavLink
          to="/myAccount"
          className={navStatus.myProfile ? "activeTab" : "nonActiveTab"}
          onClick={() => {
            setNavStatus({
              home: false,
              myChirpings: false,
              myCagedChirpings: false,
              myProfile: true,
              creatorProfile: false
            });
          }}
        >
          {navStatus.myProfile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
              }}
            >
              <img
                alt="My Profile"
                src={MyProfileYellow}
                style={{ width: "2rem" }}
              ></img>
              <span className="tabText">Account</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0rem 1rem",
              }}
            >
              <img
                alt="My Profile"
                src={MyProfile}
                style={{ width: "2rem" }}
              ></img>
              <span className="tabText">Account</span>
            </div>
          )}
        </NavLink>
      </div>
      <div
        className="normalButton"
        style={{ marginTop: "1rem", cursor: "pointer" }}
        onClick={chirpingModalToggle}
      >
        <span
          className="buttonText"
          style={{
            fontSize: "36px",
          }}
        >
          <span>Chirp</span>
          <img
            alt="Chirping Logo none"
            src={ChirpingLogoNone}
            style={{ width: "2.5rem", marginLeft: "1rem" }}
          ></img>
        </span>
      </div>
    </div>
  );
};

export default LeftSideBar;
