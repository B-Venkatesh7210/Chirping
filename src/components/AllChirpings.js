import React, { useState, useEffect } from "react";
import { getEllipsisTxt } from "../helpers/formatters";
import Cage from "../assets/logos/Cage.png";
import Wings from "../assets/logos/Wings.png";
import Moment from "react-moment";
import moment from "moment";
import WingsYellow from "../assets/logos/WingsYellow.png";

const AllChirpings = ({
  chirping,
  givingCage,
  givingWings,
  wingsGivenCheck,
}) => {
  const [chirpingText, setChirpingText] = useState();
  const [chirpingImage, setChirpingImage] = useState();
  const [chirpingIdArray, setChirpingIdArray] = useState([]);
  const [wingsGivenTrue, setWingsGivenTrue] = useState(false);

  useEffect(() => {
    const showChirpingText = async (_chirpingText) => {
      try {
        let response = await fetch(_chirpingText);
        let responseJson = await response.json();
        const chirpingText = responseJson.chirpingText;
        const chirpingImage = responseJson.imageURL;
        setChirpingText(chirpingText);
        setChirpingImage(chirpingImage);
      } catch (error) {
        console.log(error);
      }
    };

    // const showChirpingImage = async (_chirpingImage) => {
    //   try {
    //     let response = await fetch(_chirpingImage);
    //     let responseJson = await response.json();
    //     const chirpingImage = responseJson.imageURL;

    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const setWingsGiven = async () => {
      const x = await wingsGivenCheck();
      setWingsGivenTrue(x);
    };

    showChirpingText(chirping.chirpingText);
    // if (!(chirping.chirpingImage.length === 0)) {
    //   showChirpingImage(chirping.chirpingImage);
    // }
    setWingsGiven();
  }, []);

  return (
    <>
      <div className="chirpingPost">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <span
            className="text"
            style={{ margin: "0rem 2rem", fontSize: "18px" }}
          >
            {getEllipsisTxt(chirping.creator, 6)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            padding: "0rem 2rem",
          }}
        >
          {chirpingImage === undefined ? (
            <span
              className="text"
              style={{ fontSize: "30px", marginTop: "1rem" }}
            >
              {chirpingText}
            </span>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "2rem 0rem"
              }}
            >
              <img
                alt="Chirping"
                src={chirpingImage}
                className="chirpingImage"
              ></img>
            </div>
          )}

          {/* <span style={{ margin: "0rem 1rem" }}>
            {chirping.wings.toNumber()}
          </span> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1.5rem 0rem",
          }}
        >
          <div
            className="text"
            style={{ fontSize: "15px" }}
            onClick={() => {
              console.log(chirping.timestamp.toNumber());
            }}
          >
            <Moment
              date={chirping.timestamp.toNumber() * 1000}
              format="LLLL"
            ></Moment>
            {/* {chirping.timestamp.toNumber()} */}
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: "1rem",
            }}
          >
            <img
              alt="Cage"
              src={Cage}
              style={{ width: "2.5rem", cursor: "pointer" }}
              // onClick={givingCage}
              onClick={() => {
                console.log(chirpingImage);
              }}
            ></img>
            <span
              className="text"
              style={{ margin: "0rem 1rem", fontSize: "40px" }}
            >
              {chirping.cages.toNumber()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <img
              alt="Wings"
              src={
                wingsGivenTrue
                  ? WingsYellow
                  : chirpingIdArray.includes(chirping.chirpingId)
                  ? WingsYellow
                  : Wings
              }
              style={{ width: "5rem", cursor: "pointer" }}
              onClick={async () => {
                await givingWings();
                setChirpingIdArray((arr) => [...arr, chirping.chirpingId]);
              }}
            ></img>
            <span
              className="text"
              style={{ margin: "0rem 1rem", fontSize: "40px" }}
            >
              {chirping.wings.toNumber()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllChirpings;
