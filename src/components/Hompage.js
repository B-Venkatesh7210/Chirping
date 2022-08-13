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
import { Link } from "react-router-dom";
import LogoAnimation from "../assets/images/LogoAnimation.gif";
import Spinner from "../assets/images/Spinner.gif";
import CreatorProfile from "./CreatorProfile";

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
    creatorProfile: false,
  });

  const [random, setRandom] = useState(false);
  const [promoteLevelModal, setPromoteLevelModal] = useState(false);
  const [chirpingModal, setChirpingModal] = useState(false);
  const [addNameData, setAddNameData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [promoteLevelStatus, setpromoteLevelStatus] = useState(false);
  const [allChirpings, setAllChirpings] = useState([]);
  const [myChirpings, setMyChirpings] = useState([]);
  const [myCagedChirpings, setMyCagedChirpings] = useState([]);
  const [instructionModal, setInstructionModal] = useState(false);
  const [currUser, setCurrUser] = useState();
  const [userData, setUserData] = useState({
    username: "",
    totalChirpings: 0,
    totalWings: 0,
    totalCages: 0,
    level: 0,
  });
  const [currCreator, setCurrCreator] = useState();

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

  const getCreatorData = async (_creator) => {
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "showCurrUser",
      params: {
        user: _creator,
      },
    };

    const x = await Moralis.executeFunction(options);
    return x;
  };

  const givingWings = async (chirpingId) => {
    try {
      const options = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "givingWings",
        params: {
          _chirpingId: chirpingId,
        },
      };

      const transaction = await Moralis.executeFunction(options);
      setLoading(true);
      await transaction.wait();
      setLoading(false);
      window.location.reload();
    } catch (err) {
      alert(err.data.message);
    }
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
    setLoading(true);
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "givingCage",
      params: {
        _chirpingId: uId,
      },
    };

    const transaction = await Moralis.executeFunction(options);
    await transaction.wait();
    setLoading(false);
    window.location.reload();
  };

  const cagesGiven = async (chirpingId) => {
    const readOptions = {
      contractAddress: config.contractAddress,
      functionName: "cagesGivenCheck",
      abi: contractABI,
      params: {
        _chirpingId: chirpingId,
        _user: currUser.username,
      },
    };

    const result = await Moralis.executeFunction(readOptions);
    return result;
  };

  const promoteLevel = async (username) => {
    setLoading(true);
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "promoteLevel",
      params: {
        user: username,
      },
    };

    const transaction = await Moralis.executeFunction(options);
    await transaction.wait();
    setpromoteLevelStatus(true);
    setLoading(false);
    console.log("Level status has been updated");
  };

  const promoteLevelCheck = () => {
    if (
      currUser.totalChirpings >= 10 &&
      currUser.totalChirpings < 20 &&
      currUser.totalWings >= 20 &&
      currUser.level === 0
    ) {
      return true;
    } else if (
      currUser.totalChirpings >= 20 &&
      currUser.totalChirpings < 30 &&
      currUser.totalWings >= 40 &&
      user.level < 2
    ) {
      return true;
    } else if (
      currUser.totalChirpings >= 30 &&
      currUser.totalChirpings < 50 &&
      currUser.totalWings >= 60 &&
      currUser.level < 3
    ) {
      return true;
    } else if (
      currUser.totalChirpings >= 50 &&
      currUser.totalChirpings < 70 &&
      currUser.totalWings >= 80 &&
      currUser.level < 4
    ) {
      return true;
    } else if (
      currUser.totalChirpings >= 70 &&
      currUser.totalChirpings < 100 &&
      currUser.totalWings >= 100 &&
      currUser.level < 5
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addingName = async () => {
    setLoading(true);
    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "addName",
      params: {
        _name: addNameData.name,
      },
    };

    const transaction = await Moralis.executeFunction(options);
    await transaction.wait();
    setLoading(false);
    window.location.reload();
  };

  const addUser = async (username) => {
    try {
      const options = {
        contractAddress: config.contractAddress,
        abi: contractABI,
        functionName: "addUser",
        params: {
          user: username,
          displayPicture: displayPicture,
        },
      };
      const transaction = await Moralis.executeFunction(options);
      setLoading(true);
      await transaction.wait();
      setLoading(false);
      window.location.reload();
      console.log("User has been added");
      setInstructionModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    if (!isAuthenticated) {
      setLoading(true);
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(async function (user) {
          console.log(user.get("ethAddress"));
          const username = user.get("ethAddress");
          setLoading(true);
          addUser(username);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Already logged In");
    }
    setLoading(false);
  };

  const logOut = async () => {
    await logout();
    window.location.reload();
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
    let imageUrl = "";
    if (currUser.level >= 5) {
      if (formData.imageFile === undefined) {
        return imageUrl;
      } else {
        const imageURL = await uploadImage();
        return imageURL;
      }
    } else {
      return imageUrl;
    }
  };

  const settingDisplayPictureURL = async () => {
    if (currUser.level >= 5) {
      const imageURL = await uploadDisplayPicture();
      return imageURL;
    }
  };

  const addChirping = async () => {
    setLoading(true);

    const imageUrl = await settingImageURL();

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

    const transaction = await Moralis.executeFunction(options);

    await transaction.wait();
    setLoading(false);
    window.location.reload();

    console.log("executed");
  };

  const addPicture = async () => {
    setLoading(true);
    const imageURL = await settingDisplayPictureURL();

    const options = {
      contractAddress: config.contractAddress,
      abi: contractABI,
      functionName: "changeDisplayPicture",
      params: {
        _imageURL: imageURL,
      },
    };

    const transaction = await Moralis.executeFunction(options);
    await transaction.wait();
    setLoading(false);
    window.location.reload();
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
        <ReactModal
          className="loading"
          style={{
            overlay: {
              backgroundColor: "rgb(228, 179, 229, 0.45)",
              backdropFilter: "blur(5px)",
            },
          }}
          isOpen={loading}
        >
          <img
            alt="Logo Animation"
            src={ChirpingLogo}
            style={{
              width: "12rem",
              position: "absolute",
              top: "35%",
              right: "45%",
            }}
          ></img>
        </ReactModal>
        <ReactModal
          className="addPictureModal"
          style={{
            width: "20rem",
            height: "15rem",
            overlay: {
              backgroundColor: "rgb(228, 179, 229, 0.45)",
            },
          }}
          isOpen={promoteLevelModal}
          onRequestClose={() => {
            setPromoteLevelModal(false);
          }}
        >
          <div
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
            onClick={() => {
              setPromoteLevelModal(false);
            }}
          >
            <img
              alt="Close"
              src={Close}
              style={{ width: "1.5rem", marginRight: "1rem" }}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {promoteLevelStatus ? (
              <span className="text" style={{ fontSize: "32px" }}>
                You've Been Promoted
              </span>
            ) : (
              <span className="text" style={{ fontSize: "32px" }}>
                Processing, please wait!
              </span>
            )}
          </div>
        </ReactModal>
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
            onSubmit={() => {
              setChirpingModal(false);
              addChirping();
            }}
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
                currUser.level >= 5 ? (
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
        <ReactModal
          className="chirpingModal"
          style={{
            overlay: {
              backgroundColor: "rgb(228, 179, 229, 0.45)",
            },
          }}
          isOpen={instructionModal}
          onRequestClose={() => {
            setInstructionModal(false);
          }}
        >
          <div
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
            onClick={() => {
              setInstructionModal(false);
            }}
          >
            <img
              alt="Close"
              src={Close}
              style={{ width: "2rem", marginRight: "1rem" }}
            ></img>
          </div>
          <div className="text" style={{ fontSize: "30px" }}>
            Instructions
          </div>
        </ReactModal>
        {!user ? (
          <button className="connectWallet" onClick={login}>
            <span style={{ fontSize: "22px" }}>Connect Wallet</span>
          </button>
        ) : (
          <div>
            <button className="connectWallet2" onClick={logOut}>
              <span style={{ fontSize: "14px" }}>Logout</span>
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
        <div
          style={{
            height: "15vh",
            width: "60%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              alt="Chirping logo"
              src={ChirpingLogo}
              className="chirpingLogo"
            ></img>
          </Link>

          <img
            alt="Chirping text"
            src={ChirpingText}
            style={{
              width: "35rem",
              position: "absolute",
              top: "-3%",
              left: "30%",
              right: "25%",
            }}
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
            {/* <button
              onClick={() => {
                // console.log(userData);
                // console.log(allChirpings);
                // console.log(myChirpings);
                // console.log(myCagedChirpings);
                // console.log(promoteLevelStatus);
                console.log(currUser);
              }}
            >
              CLick here
            </button> */}
            <LeftSideBar
              currUser={currUser}
              setChirpingModal={setChirpingModal}
              setNavStatus={setNavStatus}
              navStatus={navStatus}
            />
          </div>
          <div className="middleBar">
            {user ? (
              <div>
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
                          cagesGivenCheck={async () => {
                            const x = await cagesGiven(chirping.chirpingId);
                            return x;
                          }}
                          getCreatorData={async () => {
                            const x = await getCreatorData(chirping.creator);
                            return x;
                          }}
                          setNavStatus={setNavStatus}
                          setCurrCreator={setCurrCreator}
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
                          wingsGivenCheck={async () => {
                            const x = await wingsGiven(chirping.chirpingId);
                            return x;
                          }}
                          cagesGivenCheck={async () => {
                            const x = await cagesGiven(chirping.chirpingId);
                            return x;
                          }}
                          getCreatorData={async () => {
                            const x = await getCreatorData(chirping.creator);
                            return x;
                          }}
                          setNavStatus={setNavStatus}
                          setCurrCreator={setCurrCreator}
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
                          wingsGivenCheck={async () => {
                            const x = await wingsGiven(chirping.chirpingId);
                            return x;
                          }}
                          cagesGivenCheck={async () => {
                            const x = await cagesGiven(chirping.chirpingId);
                            return x;
                          }}
                          getCreatorData={async () => {
                            const x = await getCreatorData(chirping.creator);
                            return x;
                          }}
                          setCurrCreator={setCurrCreator}
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
                ) : navStatus.creatorProfile ? (
                  <CreatorProfile
                    currCreator={async () => {
                      const x = await getCreatorData(currCreator);
                      return x;
                    }}
                  />
                ) : (
                  <div>Something Else</div>
                )}
              </div>
            ) : (
              <div
                className="text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",
                  fontSize: "50px",
                }}
              >
                Please Connect Your Wallet
              </div>
            )}
          </div>
          <div style={{ height: "100%", width: "25%" }}>
            <RightSideBar
              currUser={currUser}
              setPromoteLevelModal={setPromoteLevelModal}
              promoteLevel={promoteLevel}
              promoteLevelCheck={() => {
                const x = promoteLevelCheck();
                return x;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
