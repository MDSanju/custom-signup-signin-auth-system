import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/login");
  };
  return (
    <div className="f-404-page-not-found-page">
      <div className="f-404-container">
        <p className="f-404-code-hm">Click the button below to Sign In!</p>
        <button onClick={loginUser} className="f-404-call-to-action">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
