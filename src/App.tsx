import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./components/pages/Details/Details";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import NoMatch from "./components/shared/NoMatch/NoMatch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Details />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
