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
import Close from "../assets/images/Close.png";
import ReactModal from "react-modal";
import MyProfile from "./MyProfile";
import Sample from "../assets/images/Sample.png";

const Homepage = () => {
  Moralis.initialize("DhIkCD6RgzXux1tHt61zUUfy05Qw6YDg7P4F77TI");
  Moralis.serverURL = "https://odzn6qu9o4zo.usemoralis.com:2053/server";

  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const displayPicture =
    "https://ipfs.moralis.io:2053/ipfs/QmeRcZfbJJD4To5hxsTiDyuUDYVTppg4RYnnMozSaJDMR3";
  const [formData, setFormData] = useState({
    desp: "",
    imageFile: undefined,
  });
  const [addPictureData, setAddPictureData] = useState({
    imageFile: undefined,
  });
  const [navStatus, setNavStatus] = useState({
    home: true,
    myChirpings: false,
    myCagedChirpings: false,
    myProfile: false,
  });

  const [random, setRandom] = useState(false);
  const [imageURL, setImageURL] = useState();
  const [promoteLevelModal, setPromoteLevelModal] = useState(false);
  const [promoteLevelStatus, setPromoteLevelStatus] = useState();
  const [chirpingModal, setChirpingModal] = useState(false);
  const [addNameData, setAddNameData] = useState({
    name: ""
  })
  const [allChirpings, setAllChirpings] = useState([]);
  const [myChirpings, setMyChirpings] = useState([]);
  const [myCagedChirpings, setMyCagedChirpings] = useState([]);
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

  const givingWings = async (chirpingId) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "givingWings",
      params: {
        _chirpingId: chirpingId,
      },
    };

    const x = await Moralis.executeFunction(options);
    await x.wait();
  };

  const wingsGiven = async (chirpingId) => {
    const readOptions = {
      contractAddress: config.contractAddress,
      functionName: "wingsGivenCheck",
      abi: contractABI,
      params: {
        _chirpingId: chirpingId,
        _user: currUser.username,
      },
    };

    const result = await Moralis.executeFunction(readOptions);
    return result;
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

  const addingName = async(e) => {
    e.preventDefault();

    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "addName",
      params: {
        _name: addNameData.name,
      },
    }
    
    await Moralis.executeFunction(options);

  }

  const addUser = async (username) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "addUser",
      params: {
        user: username,
        displayPicture: displayPicture,
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

  const uploadImage = async () => {
    const data = formData.imageFile[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    return file.ipfs();
  };

  const uploadDisplayPicture = async () => {
    const data = addPictureData.imageFile[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    return file.ipfs();
  };

  const settingImageURL = async () => {
    let imageUrl = "none";
    if (currUser.level >= 0) {
      if (formData.imageFile === undefined) {
        return imageURL;
      } else {
        const imageURL = await uploadImage();
        return imageURL;
      }
    } else {
      return imageUrl;
    }
  };

  const settingDisplayPictureURL = async () => {
    if (currUser.level >= 0) {
      const imageURL = await uploadDisplayPicture();
      return imageURL;
    }
  };

  const addChirping = async (e) => {
    e.preventDefault();

    const imageUrl = await settingImageURL();
    console.log(imageURL);

    const strLen = formData.desp.length;

    const metadata = {
      chirpingText: formData.desp,
      imageURL: imageUrl,
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
        _chirpingImage: dataUrl,
      },
    };

    await Moralis.executeFunction(options);
    setTimeout(function () {
      console.log("Chirping has been added");
      window.location.reload();
    }, 10000);

    console.log("executed");
  };

  const addPicture = async (e) => {
    e.preventDefault();
    const imageURL = await settingDisplayPictureURL();

    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "changeDisplayPicture",
      params: {
        _imageURL: imageURL,
      },
    };

    await Moralis.executeFunction(options);
  };

  return (
    <div className="mainBg">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 2rem 0rem 2rem",
        }}
      >
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
        {!user ? (
          <button className="connectWallet" onClick={login}>
            <span style={{ fontSize: "26px" }}>Connect Wallet</span>
          </button>
        ) : (
          <div>
            <button className="connectWallet2" onClick={logOut}>
              <span style={{ fontSize: "30px" }}>
                {/* {getEllipsisTxt(user.get("ethAddress"), 6)} */}
                Logout
              </span>
            </button>
            <div
              className="displayPicture"
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
                src={currUser ? currUser.displayPicture : displayPicture}
                style={{
                  width: "8rem",
                  height: "8rem",
                }}
              ></img>
            </div>
          </div>
        )}
        <ReactModal
          className="chirpingModal"
          style={{
            overlay: {
              backgroundColor: "rgb(228, 179, 229, 0.45)",
            },
          }}
          isOpen={chirpingModal}
          onRequestClose={() => {
            setChirpingModal(false);
          }}
        >
          <div
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
            onClick={() => {
              setChirpingModal(false);
            }}
          >
            <img
              alt="Close"
              src={Close}
              style={{ width: "2rem", marginRight: "1rem" }}
            ></img>
          </div>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                width: "35rem",
              }}
            >
              {currUser ? (
                currUser.level >= 0 ? (
                  <input
                    className="textField"
                    type="file"
                    style={{ marginTop: "2rem", marginLeft: "4rem" }}
                    onChange={(e) => {
                      e.preventDefault();
                      setFormData({ ...formData, imageFile: e.target.files });
                    }}
                  ></input>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}
            </div>

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
                // console.log(userData);
                // console.log(allChirpings);
                // console.log(myChirpings);
                // console.log(myCagedChirpings);
                // console.log(promoteLevelStatus);
                console.log(currUser.name);
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
                {allChirpings
                  .map((chirping) => (
                    <AllChirpings
                      key={chirping.chirpingId}
                      chirping={chirping}
                      givingCage={() => {
                        givingCage(chirping.chirpingId);
                      }}
                      givingWings={async () => {
                        await givingWings(chirping.chirpingId);
                      }}
                      wingsGivenCheck={async () => {
                        const x = await wingsGiven(chirping.chirpingId);
                        return x;
                      }}
                    />
                  ))
                  .reverse()}
              </div>
            ) : navStatus.myChirpings ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {myChirpings
                  .map((chirping) => (
                    <AllChirpings
                      key={chirping.chirpingId}
                      chirping={chirping}
                      givingCage={() => {
                        givingCage(chirping.chirpingId);
                      }}
                      givingWings={() => {
                        givingWings(chirping.chirpingId);
                      }}
                    />
                  ))
                  .reverse()}
              </div>
            ) : navStatus.myCagedChirpings ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {myCagedChirpings
                  .map((chirping) => (
                    <AllChirpings
                      key={chirping.chirpingId}
                      chirping={chirping}
                      givingCage={() => {
                        givingCage(chirping.chirpingId);
                      }}
                      givingWings={() => {
                        givingWings(chirping.chirpingId);
                      }}
                    />
                  ))
                  .reverse()}
              </div>
            ) : navStatus.myProfile ? (
              <MyProfile
                currUser={currUser}
                addPicture={addPicture}
                setAddPictureData={setAddPictureData}
                addPictureData={addPictureData}
                addNameData={addNameData}
                setAddNameData={setAddNameData}
                addingName={addingName}
              />
            ) : (
              <div>Something Else</div>
            )}
          </div>
          <div style={{ height: "100%", width: "25%" }}>
            <RightSideBar
              currUser={currUser}
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
