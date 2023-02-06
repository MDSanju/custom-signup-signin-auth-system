import React from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();

  const homePage = () => {
    navigate("/");
  };
  return (
    <div className="f-404-page-not-found-page">
      <div className="f-404-container">
        <p className="f-404-code-hm">Dashboard</p>
        <button onClick={homePage} className="f-404-call-to-action">
          Home
        </button>
      </div>
    </div>
  );
};

export default Details;
