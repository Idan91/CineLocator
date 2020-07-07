import React, { useContext, useRef, useEffect } from "react";
import Map from "./Map";
import { Context } from "../context/Context";

const Main = () => {
  const {
    populateCitySelectBox,
    handleCitySelectChange,
    onLocateTheartersClick,
  } = useContext(Context);

  // Fix OpenLayers resize glitch
  useEffect(() => {
    // Resize event for dektop
    var resizeEvent = window.document.createEvent("UIEvents");
    resizeEvent.initUIEvent("resize", true, false, window, 0);

    // OrientationChange for mobile
    var orientationChangeEvent = window.document.createEvent("UIEvents");
    orientationChangeEvent.initUIEvent(
      "orientationchange",
      true,
      false,
      window,
      2
    );

    setTimeout(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        window.dispatchEvent(orientationChangeEvent);
        window.dispatchEvent(orientationChangeEvent);
        window.scrollTo({
          top: -200,
          left: 0,
          behavior: "smooth",
        });
      } else {
        window.dispatchEvent(resizeEvent);
      }
    }, 150);
  });

  const coordinateDiv = useRef(null);

  return (
    <React.Fragment>
      <div className="content-container">
        <br />
        <br />
        <br />
        <div className="logo logo-main" alt="CineLocator" />
        <div className="input-container">
          <select
            name="cities"
            className="city-select"
            onChange={handleCitySelectChange}
          >
            <option value="0">בחר עיר:</option>
            {populateCitySelectBox()}
          </select>
        </div>
        <br />
        <button
          className="btn btn-locate"
          onClick={(event) => onLocateTheartersClick(event, coordinateDiv)}
        >
          חפש קולנוע בסביבתך
        </button>
        <h4>* בתי קולנוע מרשתות yes Planet, Cinema City ו-HOT Cinema בלבד</h4>
        <div ref={coordinateDiv} id="city-coordinates"></div>
        <br />
        <Map />
      </div>
    </React.Fragment>
  );
};

export default Main;
