import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Hompage";
import Moralis from "moralis";

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
