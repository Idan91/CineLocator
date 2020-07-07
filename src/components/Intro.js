import React, { useContext } from "react";
import { Context } from "../context/Context";

const Intro = () => {
  const { onStartButtonClick } = useContext(Context);

  return (
    <div className="intro-container">
      <br />
      <div className="logo logo-homepage" alt="CineLocator" />
      <h1>מצא את הקולנוע הקרוב לעיר בה אתה גר!</h1>
      <br />
      <button className="btn start-btn" onClick={onStartButtonClick}>
        כניסה
      </button>
    </div>
  );
};

export default Intro;
