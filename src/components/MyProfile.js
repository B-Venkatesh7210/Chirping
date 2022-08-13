import React, { useState } from "react";
import Chirping from "../assets/logos/ChirpingLogo.png";
import Wings from "../assets/logos/WingsYellow.png";
import Cages from "../assets/logos/CageYellow.png";
import Level from "../assets/logos/Level.png";
import Close from "../assets/images/Close.png";
import ReactModal from "react-modal";

const MyProfile = ({
  currUser,
  addPicture,
  setAddPictureData,
  addPictureData,
  addNameData,
  setAddNameData,
  addingName,
}) => {
  const [addPictureModal, setAddPictureModal] = useState(false);
  const [addNameModal, setAddNameModal] = useState(false);

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
      <ReactModal
        className="addPictureModal"
        style={{
          width: "20rem",
          height: "20rem",
          overlay: {
            backgroundColor: "rgb(228, 179, 229, 0.45)",
          },
        }}
        isOpen={addPictureModal}
        onRequestClose={() => {
          setAddPictureModal(false);
        }}
      >
        <div
          style={{ position: "absolute", right: "1rem", top: "1rem" }}
          onClick={() => {
            setAddPictureModal(false);
          }}
        >
          <img
            alt="Close"
            src={Close}
            style={{ width: "1.5rem", marginRight: "1rem" }}
          ></img>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
          }}
          onSubmit={() => {
            setAddPictureModal(false);
            addPicture();
          }}
        >
          <input
            className="textField"
            type="file"
            style={{ marginTop: "2rem", marginLeft: "4rem" }}
            onChange={(e) => {
              e.preventDefault();
              setAddPictureData({
                ...addPictureData,
                imageFile: e.target.files,
              });
            }}
          ></input>
          <input
            className="textfield"
            type="submit"
            style={{
              width: "10rem",
              height: "3rem",
              fontSize: "20px",
              marginTop: "2rem",
            }}
          ></input>
        </form>
      </ReactModal>
      <ReactModal
        className="addPictureModal"
        style={{
          width: "20rem",
          height: "20rem",
          overlay: {
            backgroundColor: "rgb(228, 179, 229, 0.45)",
          },
        }}
        isOpen={addNameModal}
        onRequestClose={() => {
          setAddNameModal(false);
        }}
      >
        <div
          style={{ position: "absolute", right: "1rem", top: "1rem" }}
          onClick={() => {
            setAddNameModal(false);
          }}
        >
          <img
            alt="Close"
            src={Close}
            style={{ width: "1.5rem", marginRight: "1rem" }}
          ></img>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
          }}  
          onSubmit={() => {
            setAddNameModal(false);
            addingName();
          }}
        >
          <input
            className="textfield"
            type="text"
            placeholder="Type your name"
            style={{ marginTop: "2rem", marginLeft: "0rem" }}
            onChange={(e) => {
              e.preventDefault();
              setAddNameData({
                ...addNameData,
                name: e.target.value,
              });
            }}
          ></input>
          <input
            className="textfield"
            type="submit"
            style={{
              width: "10rem",
              height: "3rem",
              fontSize: "20px",
              marginTop: "2rem",
            }}
          ></input>
        </form>
      </ReactModal>
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
            {currUser.level.toNumber()}
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
            {currUser.totalChirpings.toNumber()}
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
            {currUser.totalWings.toNumber()}
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
            {currUser.totalCages.toNumber()}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
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
            }}
          >
            <img
              alt="Profile"
              src={currUser.displayPicture}
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "100%",
              }}
            ></img>
          </div>
          {currUser.level >= 5 ? (
            <button
              className="normalButton"
              style={{ height: "3rem", width: "14rem", marginTop: "2rem" }}
              onClick={() => {
                setAddPictureModal(true);
              }}
            >
              <span className="buttonText" style={{ fontSize: "20px" }}>
                Add Picture
              </span>
            </button>
          ) : (
            <button
              className="normalButtonNoHover"
              disabled={true}
              style={{ height: "3rem", width: "14rem", marginTop: "2rem" }}
            >
              <span className="buttonText" style={{ fontSize: "20px" }}>
                Add Picture
              </span>
            </button>
          )}
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
            {currUser.name.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span className="text" style={{ fontSize: "40px" }}>
                  No
                </span>
                <span className="text" style={{ fontSize: "40px" }}>
                  Name
                </span>
              </div>
            ) : (
              <span className="text" style={{ fontSize: "40px" }}>
                {currUser.name}
              </span>
            )}
          </div>
          {currUser.level >= 4 ? (
            <button
              className="normalButton"
              style={{ height: "3rem", width: "14rem", marginTop: "2rem" }}
              onClick={() => {
                setAddNameModal(true);
              }}
            >
              <span className="buttonText" style={{ fontSize: "20px" }}>
                Add Name
              </span>
            </button>
          ) : (
            <button
              className="normalButtonNoHover"
              disabled={true}
              style={{ height: "3rem", width: "14rem", marginTop: "2rem" }}
            >
              <span className="buttonText" style={{ fontSize: "20px" }}>
                Add Name
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
