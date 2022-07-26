import React, { useState, useEffect } from "react";
import { getEllipsisTxt } from "../helpers/formatters";
import Moralis from "moralis";
import config from "../config/config";
import contractABI from "../contract/ChirpingABI.json";
import { useMoralis } from "react-moralis";

const AllChirpings = ({chirping, givingCage,givingWings}) => {

  const [chirpingText, setChirpingText] = useState();

  useEffect(() => {
    const showChirpingText = async (_chirpingText) => {
      try {
        let response = await fetch(_chirpingText);
        let responseJson = await response.json();
        const chirpingText = responseJson.chirpingText;
        setChirpingText(chirpingText);
      } catch (error) {
        console.log(error);
      }
    };

    showChirpingText(chirping.chirpingText);
  }, []);

  return (
    <>
        <div
          style={{
            height: "6rem",
            width: "80%",
            background: "blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{margin: "0rem 1rem"}}>{getEllipsisTxt(chirping.creator, 6)}</span>
            <span>{chirpingText}</span>
            <span style={{margin: "0rem 1rem"}}> {chirping.cages.toNumber()}</span>
            <span style={{margin: "0rem 1rem"}}> {chirping.wings.toNumber()}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button onClick={givingCage}>Cages</button>
            <button onClick={givingWings}>Wings</button>
          </div>
        </div>
    </>
  );
};

export default AllChirpings;
