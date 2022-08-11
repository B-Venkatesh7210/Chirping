import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Hompage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/home" element={<Homepage/>}></Route>
        <Route exact path="/myChirpings" element={<Homepage/>}></Route>
        <Route exact path="/caged" element={<Homepage/>}></Route>
        <Route exact path="/myAccount" element={<Homepage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
