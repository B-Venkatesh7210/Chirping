import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import contractABI from "../contract/ChirpingABI.json";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const Homepage = () => {
  Moralis.initialize("DhIkCD6RgzXux1tHt61zUUfy05Qw6YDg7P4F77TI");
  Moralis.serverURL = "https://odzn6qu9o4zo.usemoralis.com:2053/server";

  const contractAddress = "0x0E433408B83aCAC5F0d519Be57438544d8912968";

  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    isWeb3Enabled,
    enableWeb3,
    web3,
  } = useMoralis();
  const [formData, setFormData] = useState({
    desp: "",
  });

  const [random, setRandom] = useState(false);
  const [allChirpings, setAllChirpings] = useState([]);
  const [dataHash, setDataHash] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [currUser, setCurrUser] = useState();
  const [userData, setUserData] = useState({
    userName: "",
    totalChirpings: 0,
    totalWings: 0,
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
      // await Moralis.enableWeb3();

      const options = {
        contractAddress: contractAddress,
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
        userName: currentUser.username.toString(),
        totalChirpings: currentUser.totalChirpings.toNumber(),
        totalWings: currentUser.totalWings.toNumber(),
        level: currentUser.level.toNumber(),
      });

      // const options2 = {
      //   contractAddress: contractAddress,
      //   abi: contractABI,
      //   functionName: "getAllChirpings",
      // };

      // const allChirpings = await Moralis.executeFunction(options2);
      // setAllChirpings(allChirpings);
    };

    if (isAuthenticated && random) {
      getData();
      console.log(user.get("ethAddress"));
    }
  }, [user, isAuthenticated, random]);

  const addUser = async (username) => {
    const options = {
      contractAddress: contractAddress,
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

    const options = {
      contractAddress: contractAddress,
      abi: contractABI,
      functionName: "addChirping",
      params: {
        _numOfChareacters: strLen,
        _chirpingText: dataUrl,
      },
    };

    await Moralis.executeFunction(options);

    console.log("executed");
  };

  const showChirpingText = async (_chirpingText) => {
    const chirpingText = fetch(_chirpingText)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.chirpingText;
      })
      .catch((error) => {
        console.error(error);
      });

    return <span>{chirpingText}</span>;
  };

  const givingWings = async (uId) => {
    const options = {
      contractAddress: contractAddress,
      abi: contractABI,
      functionName: "givingWings",
      params: {
        chirpingId: uId,
      },
    };

    await Moralis.executeFunction(options);
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
    //     {allChirpings.map((chirping) => (
    //       <div
    //         key={chirping.uId}
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           width: "90%",
    //           height: "5rem",
    //           background: "green",
    //           margin: "1rem 0rem",
    //         }}
    //       >
    //         <span>Creator: {getEllipsisTxt(chirping.creator, 6)}</span>
    //         {showChirpingText(chirping.chirpingText)}
    //         <span>{chirping.wings.toNumber()}</span>
    //         <button onClick={() => givingWings(chirping.chirpingId)}>
    //           Give Wing
    //         </button>
    //       </div>
    //     ))}
    //   </div> */}
    // </div>
    <div className="mainBg">
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
        <div style={{ height: "15vh", width: "50%", background: "red" }}>
          Title
        </div>
        <div
          style={{
            height: "75vh",
            width: "100%",
            marginTop: "2rem",
            background: "blue",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ height: "100%", width: "24%", background: "green" }}>
          <LeftSideBar/>
          </div>
          <div style={{ height: "100%", width: "49%", background: "green" }}>
          <LeftSideBar/>
          </div>
          <div style={{ height: "100%", width: "25%", background: "green" }}>
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
