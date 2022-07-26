import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import contractABI from "../contract/ChirpingABI.json";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import AllChirpings from "./AllChirpings";
import config from "../config/config";
import ChirpingText from "../assets/images/ChirpingText.png";
import ChirpingLogo from "../assets/logos/ChirpingLogo.png";

const Homepage = () => {
  Moralis.initialize("DhIkCD6RgzXux1tHt61zUUfy05Qw6YDg7P4F77TI");
  Moralis.serverURL = "https://odzn6qu9o4zo.usemoralis.com:2053/server";

  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [formData, setFormData] = useState({
    desp: "",
  });
  const [navStatus, setNavStatus] = useState({
    home: true,
    myChirpings: false,
    myCagedChirpings: false,
    myProfile: false,
  });

  const [random, setRandom] = useState(false);
  const [promoteLevelModal, setPromoteLevelModal] = useState(false);
  const [promoteLevelStatus, setPromoteLevelStatus] = useState();
  const [chirpingModal, setChirpingModal] = useState(false);
  const [allChirpings, setAllChirpings] = useState([]);
  const [myChirpings, setMyChirpings] = useState([]);
  const [myCagedChirpings, setMyCagedChirpings] = useState([]);
  const [dataHash, setDataHash] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [currUser, setCurrUser] = useState();
  const [userData, setUserData] = useState({
    username: "",
    totalChirpings: 0,
    totalWings: 0,
    totalCages: 0,
    level: 0,
  });

  useEffect(() => {
    const enableWeb3 = async () => {
      await Moralis.enableWeb3();
      setRandom(true);
    };
    enableWeb3();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const options = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "showCurrUser",
        params: {
          user: user.get("ethAddress"),
        },
      };

      const currentUser = await Moralis.executeFunction(options);
      console.log(currentUser);

      setCurrUser(currentUser);
      setUserData({
        ...userData,
        username: currentUser.username.toString(),
        totalChirpings: currentUser.totalChirpings.toNumber(),
        totalWings: currentUser.totalWings.toNumber(),
        totalCages: currentUser.totalCages.toNumber(),
        level: currentUser.level.toNumber(),
      });

      const options2 = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "getAllChirpings",
      };

      const allChirpings = await Moralis.executeFunction(options2);
      setAllChirpings(allChirpings);

      const options3 = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "getMyChirpings",
        params: {
          user: user.get("ethAddress"),
        },
      };

      const myChirpings = await Moralis.executeFunction(options3);
      setMyChirpings(myChirpings);

      const options4 = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "getCagedChirpings",
        params: {
          user: user.get("ethAddress"),
        },
      };

      const myCagedChirpings = await Moralis.executeFunction(options4);
      setMyCagedChirpings(myCagedChirpings);
    };

    if (isAuthenticated && random) {
      getData();
      console.log(user.get("ethAddress"));
    }
  }, [user, isAuthenticated, random]);

  const givingWings = async (uId) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "givingWings",
      params: {
        _chirpingId: uId,
      },
    };

    await Moralis.executeFunction(options);
  };

  const givingCage = async (uId) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "givingCage",
      params: {
        _chirpingId: uId,
      },
    };

    await Moralis.executeFunction(options);
  };

  const promoteLevel = async (username) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "promoteLevel",
      params: {
        user: username,
      },
    };

    const promoteLevelStatus = await Moralis.executeFunction(options);
    console.log(promoteLevelStatus);
    setPromoteLevelStatus(promoteLevelStatus);
    console.log("Level status has been updated");
  };

  const addUser = async (username) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "addUser",
      params: {
        user: username,
      },
    };

    await Moralis.executeFunction(options);
    console.log("User has been added");
  };

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(async function (user) {
          console.log(user.get("ethAddress"));
          const username = user.get("ethAddress");
          addUser(username);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Already logged In");
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  const addChirping = async (e) => {
    e.preventDefault();

    const strLen = formData.desp.length;

    const metadata = {
      chirpingText: formData.desp,
    };
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();
    const dataUrl = file.ipfs();
    console.log(dataUrl);

    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "addChirping",
      params: {
        _numOfCharacters: strLen,
        _chirpingText: dataUrl,
      },
    };

    await Moralis.executeFunction(options);

    console.log("executed");
  };

  return (
    // <div
    //   style={{
    //     height: "100%",
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "start",
    //     alignItems: "center",
    //   }}
    // >
    //   <span style={{ fontSize: "100px" }}>CHIRPING</span>
    // {!user ? (
    //   <button className="connectWallet" onClick={login}>
    //     <span className="title" style={{ fontSize: "15px" }}>
    //       Connect Wallet
    //     </span>
    //   </button>
    // ) : (
    //   <button className="connectWallet" onClick={logOut}>
    //     <span className="title" style={{ fontSize: "15px" }}>
    //       {getEllipsisTxt(user.get("ethAddress"), 6)}
    //     </span>
    //   </button>
    // )}
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-evenly",
    //       alignItems: "center",
    //       width: "100%",
    //       height: "40vh",
    //       background: "red",
    //     }}
    //   >
    //     {user ? (
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-evenly",
    //           alignItems: "center",
    //           width: "30%",
    //           height: "40vh",
    //           background: "blue",
    //         }}
    //       >
    //         <div
    //           className="textfield"
    //           style={{ height: "2rem", width: "15rem" }}
    //         >
    //           {getEllipsisTxt(userData.userName, 6)}
    //         </div>
    //         <div
    //           className="textfield"
    //           style={{ height: "2rem", width: "15rem" }}
    //         >
    //           Total Chirpings : {userData.totalChirpings}
    //         </div>
    //         <div
    //           className="textfield"
    //           style={{ height: "2rem", width: "15rem" }}
    //         >
    //           Total Wings : {userData.totalWings}
    //         </div>
    //         <div
    //           className="textfield"
    //           style={{ height: "2rem", width: "15rem" }}
    //         >
    //           Level : {userData.level}
    //         </div>
    //         <button
    //           className="textfield"
    //           style={{ height: "2rem", width: "15rem" }}
    //           onClick={() => {}}
    //         >
    //           Click here
    //         </button>
    //       </div>
    //     ) : (
    //       <span>Connect your wallet</span>
    //     )}

    //     <form
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //       onSubmit={addChirping}
    //     >
    //       <textarea
    //         className="textfield"
    //         style={{ width: "25rem", height: "10rem", marginTop: "2rem" }}
    //         type="text"
    //         value={formData.desp}
    //         placeholder="Type about your favourite rapper"
    //         onChange={(e) => {
    //           setFormData({ ...formData, desp: e.target.value });
    //         }}
    //       ></textarea>
    //       <input
    //         className="textfield"
    //         type="submit"
    //         style={{
    //           width: "10rem",
    //           height: "3rem",
    //           fontSize: "20px",
    //           marginTop: "2rem",
    //         }}
    //       ></input>
    //     </form>
    //   </div>
    //   {/* <div
    //     style={{
    //       flexDirection: "column",
    //       justifyContent: "end",
    //       alignItems: "center",
    //       height: "40vh",
    //       width: "50%",
    //       background: "black",
    //       overflow: "scroll",
    //     }}
    //   >
    //   {allChirpings.map((chirping) => (
    //     <div
    //       key={chirping.uId}
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         width: "90%",
    //         height: "5rem",
    //         background: "green",
    //         margin: "1rem 0rem",
    //       }}
    //     >
    //       <span>Creator: {getEllipsisTxt(chirping.creator, 6)}</span>
    //       {showChirpingText(chirping.chirpingText)}
    //       <span>{chirping.wings.toNumber()}</span>
    //       <button onClick={() => givingWings(chirping.chirpingId)}>
    //         Give Wing
    //       </button>
    //     </div>
    //   ))}
    // </div> */}
    // </div>
    <div className="mainBg">
      {promoteLevelModal ? (
        <div
          style={{
            height: "50vh",
            width: "50%",
            position: "absolute",
            top: "25%",
            right: "25%",
            background: "yellow",
          }}
        >
          {promoteLevelStatus ? (
            <span>You've been promoted</span>
          ) : (
            <span>You're not promoted</span>
          )}
          <button
            onClick={() => {
              setPromoteLevelModal(false);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {chirpingModal ? (
        <div
          style={{
            height: "60vh",
            width: "50%",
            position: "absolute",
            top: "25%",
            right: "25%",
            background: "yellow",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <button
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
            onClick={() => {
              setChirpingModal(false);
            }}
          >
            Close
          </button>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={addChirping}
          >
            <textarea
              className="textfield"
              style={{ width: "30rem", height: "8rem", marginTop: "2rem" }}
              type="text"
              value={formData.desp}
              placeholder="Chirp here!!"
              onChange={(e) => {
                setFormData({ ...formData, desp: e.target.value });
              }}
            ></textarea>
            <input
              className="textfield"
              type="submit"
              style={{
                width: "10rem",
                height: "3rem",
                fontSize: "20px",
                marginTop: "1rem",
              }}
            ></input>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      {!user ? (
        <button className="connectWallet" onClick={login}>
          <span className="title" style={{ fontSize: "15px" }}>
            Connect Wallet
          </span>
        </button>
      ) : (
        <button className="connectWallet" onClick={logOut}>
          <span className="title" style={{ fontSize: "15px" }}>
            {getEllipsisTxt(user.get("ethAddress"), 6)}
          </span>
        </button>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 2rem 0rem 2rem",
        }}
      >
        <div
          style={{
            height: "15vh",
            width: "42%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img
            alt="Chirping logo"
            src={ChirpingLogo}
            style={{ width: "5rem", marginBottom: "0.5rem" }}
          ></img>
          <img
            alt="Chirping text"
            src={ChirpingText}
            style={{ width: "35rem", margin: "1rem" }}
          ></img>
        </div>
        <div
          style={{
            height: "75vh",
            width: "100%",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="leftSideBar">
            <button
              onClick={() => {
                console.log(userData);
                console.log(allChirpings);
                console.log(myChirpings);
                console.log(myCagedChirpings);
                console.log(promoteLevelStatus);
              }}
            >
              CLick here
            </button>
            <LeftSideBar
              currUser={currUser}
              setChirpingModal={setChirpingModal}
              setNavStatus={setNavStatus}
              navStatus={navStatus}
            />
          </div>
          <div className="middleBar">
            {navStatus.home ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                HOME
                {allChirpings.map((chirping) => (
                  <AllChirpings
                    chirping={chirping}
                    givingCage={() => {
                      givingCage(chirping.chirpingId);
                    }}
                    givingWings={() => {
                      givingWings(chirping.chirpingId);
                    }}
                  />
                ))}
              </div>
            ) : navStatus.myChirpings ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {myChirpings.map((chirping) => (
                  <AllChirpings
                    chirping={chirping}
                    givingCage={() => {
                      givingCage(chirping.chirpingId);
                    }}
                    givingWings={() => {
                      givingWings(chirping.chirpingId);
                    }}
                  />
                ))}
              </div>
            ) : navStatus.myCagedChirpings ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {myCagedChirpings.map((chirping) => (
                  <AllChirpings
                    chirping={chirping}
                    givingCage={() => {
                      givingCage(chirping.chirpingId);
                    }}
                    givingWings={() => {
                      givingWings(chirping.chirpingId);
                    }}
                  />
                ))}
              </div>
            ) : navStatus.myProfile ? (
              <div>My Profile</div>
            ) : (
              <div>Something Else</div>
            )}
          </div>
          <div style={{ height: "100%", width: "25%", background: "green" }}>
            <RightSideBar
              currUser={userData}
              setPromoteLevelModal={setPromoteLevelModal}
              promoteLevel={promoteLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
