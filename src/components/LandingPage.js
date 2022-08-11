import React from "react";
import { Link } from "react-router-dom";
import ChirpingLogo from "../assets/logos/ChirpingLogo.png";
import ChirpingText from "../assets/images/ChirpingText.png";
import PoweredByPolygon from "../assets/images/poweredByPolygon.png";
import Level from "../assets/logos/Level.png";
import Wings from "../assets/logos/WingsYellow.png";
import Cage from "../assets/logos/CageYellow.png";
import Level0 from "../assets/images/Level 0.png";
import Level1 from "../assets/images/Level 1.png";
import Level2 from "../assets/images/Level 2.png";
import Level3 from "../assets/images/Level 3.png";
import Level4 from "../assets/images/Level 4.png";

const EnterDapp = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt="Powered By Polygon"
        src={PoweredByPolygon}
        style={{
          position: "absolute",
          width: "15rem",
          left: "2rem",
          top: "2rem",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="Chirping logo"
          src={ChirpingLogo}
          style={{ width: "15rem" }}
        ></img>
        <img
          alt="Chirping text"
          src={ChirpingText}
          style={{ width: "40rem", marginLeft: "2rem" }}
        ></img>
      </div>
      <div className="text" style={{ fontSize: "50px", marginTop: "2rem" }}>
        Social Media blends Gamification
      </div>
      <Link to="/home">
        <button
          className="normalButton text"
          style={{
            position: "absolute",
            bottom: "3rem",
            right: "3em",
            width: "15rem",
            fontSize: "28px",
          }}
        >
          Lets Chirp!!
        </button>
      </Link>
    </div>
  );
};

const Guide = () => {
  return (
    <div
      className="guide"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        className="text"
        style={{
          color: "white",
          fontSize: "32px",
          width: "60%",
          textAlign: "center",
          marginTop: "3rem",
        }}
      >
        Chirping is a first of its kind where you are segregated from other
        users according to the levels and the content you create.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "50%",
          marginTop: "1rem",
        }}
      >
        <div className="attributes attributeBox attributeBoxAnim">
          <div
            style={{
              height: "40%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="chirping"
              src={ChirpingLogo}
              style={{ width: "12rem", marginBottom: "2rem" }}
            ></img>
          </div>

          <div
            style={{
              height: "60%",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="text"
              style={{ fontSize: "35px", marginBottom: "1rem" }}
            >
              Chirp!
            </span>
            <span className="attributeText text">Post a Chirping</span>
            <span className="attributeText text">
              Get Wings according to the content
            </span>
            <span className="attributeText text">Beware of Cage</span>
          </div>
        </div>
        <div className="attributes attributeBox attributeBoxAnim2">
          <div
            style={{
              height: "40%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="wings"
              src={Wings}
              style={{
                width: "16rem",
                marginBottom: "2rem",
              }}
            ></img>
          </div>
          <div
            style={{
              height: "60%",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="text"
              style={{ fontSize: "35px", marginBottom: "1rem" }}
            >
              Get Wings
            </span>
            <span className="attributeText text">
              Your Chirping will get you wings
            </span>
            <span className="attributeText text">
              Wings will make you fly high
            </span>
            <span className="attributeText text">
              Get to higher level to unlock features
            </span>
          </div>
        </div>
        <div className="attributes attributeBox attributeBoxAnim">
          <div
            style={{
              height: "40%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="Cage"
              src={Cage}
              style={{ width: "8rem", marginBottom: "2rem" }}
            ></img>
          </div>
          <div
            style={{
              height: "60%",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="text"
              style={{ fontSize: "35px", marginBottom: "1rem" }}
            >
              Beware of Cage
            </span>
            <span className="attributeText text">
              Cage will make your profile look bad
            </span>
            <span className="attributeText text">
              Your Chirping could go vanished
            </span>
            <span className="attributeText text">
              Make good content to stay safe
            </span>
          </div>
        </div>
        <div className="attributes attributeBox attributeBoxAnim2">
          <div
            style={{
              height: "40%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="level"
              src={Level}
              style={{ width: "8rem", marginBottom: "2rem" }}
            ></img>
          </div>
          <div
            style={{
              height: "60%",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="text"
              style={{ fontSize: "35px", marginBottom: "1rem" }}
            >
              Level Up
            </span>
            <span className="attributeText text">
              Unlock abilities and features
            </span>
            <span className="attributeText text">Build a good Profile</span>
            <span className="attributeText text">Flex upon other users</span>
          </div>
        </div>
      </div>
      <LevelGuide style={{ height: "50%", width: "100%" }} />
    </div>
  );
};

const LevelGuide = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "baseline",
        width: "100%",
      }}
    >
      <div className="level">
        <img alt="Level 0" src={Level0} style={{ width: "6rem" }}></img>
        <div
          className="levelDesp levelDespAnim0"
          style={{ borderRadius: "20px", height: "8.5rem" }}
        >
          <span
            className="text"
            style={{ fontSize: "30px", marginTop: "1rem" }}
          >
            Level 0
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "1rem" }}
          >
            Max Char : 100
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Max Post : 3 in a day
          </span>
        </div>
      </div>
      <div className="level">
        <img alt="Level 1" src={Level1} style={{ width: "6rem" }}></img>
        <div
          className="levelDesp levelDespAnim1"
          style={{ borderRadius: "20px", height: "9rem" }}
        >
          <span
            className="text"
            style={{ fontSize: "30px", marginTop: "1rem" }}
          >
            Level 1
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "1rem" }}
          >
            Max Char : 150
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Max Post : 3 in a day
          </span>
        </div>
      </div>
      <div className="level">
        <img alt="Level 2" src={Level2} style={{ width: "6rem" }}></img>
        <div
          className="levelDesp levelDespAnim2"
          style={{ borderRadius: "20px", height: "10rem" }}
        >
          <span
            className="text"
            style={{ fontSize: "30px", marginTop: "1rem" }}
          >
            Level 2
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "1rem" }}
          >
            Max Char : 200
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Max Post : 4 in a day
          </span>
        </div>
      </div>
      <div className="level">
        <img alt="Level 3" src={Level3} style={{ width: "6rem" }}></img>
        <div
          className="levelDesp levelDespAnim3"
          style={{ borderRadius: "20px", height: "11rem" }}
        >
          <span
            className="text"
            style={{ fontSize: "30px", marginTop: "1rem" }}
          >
            Level 3
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "1rem" }}
          >
            Max Char : 300
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Max Post : 5 in a day
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Can change Username
          </span>
        </div>
      </div>
      <div className="level">
        <img alt="Level 4" src={Level4} style={{ width: "6rem" }}></img>
        <div
          className="levelDesp levelDespAnim4"
          style={{ borderRadius: "20px", height: "13rem" }}
        >
          <span
            className="text"
            style={{ fontSize: "30px", marginTop: "1rem" }}
          >
            Level 4
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "1rem" }}
          >
            Max Char : 350
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Max Post : 6 in a day
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Can change Username
          </span>
          <span
            className="text"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            Can change Display Pic
          </span>
        </div>
      </div>
    </div>
  );
};

function LandingPage() {
  return (
    <div
      className="mainBg2"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <EnterDapp />
      <Guide />
    </div>
  );
}

export default LandingPage;
