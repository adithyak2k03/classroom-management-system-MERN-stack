import React from "react";
import "../stylesheets/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h2>Waking up the server...</h2>
      <div className="loadbar-container">
        <div className="loadbar-fill"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
