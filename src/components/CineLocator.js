import React, { useContext } from "react";
import { Context } from "../context/Context";
import Intro from "./Intro";
import Main from "./Main";

const CineLocator = () => {
  const { displayIntro } = useContext(Context);

  return (
    <React.Fragment>
      {displayIntro ? <Intro /> : <Main />}
      <footer>כל הזכויות שמורות לעידן רם © 2020</footer>
    </React.Fragment>
  );
};

export default CineLocator;
