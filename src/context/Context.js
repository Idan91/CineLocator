import React, { useState, useEffect } from "react";
import CineLocator from "../components/CineLocator";

export const Context = React.createContext();

const ContextProvider = (props) => {
  const [displayIntro, setDisplayIntro] = useState(true);
  const [cityCoordinates, setCityCoordinates] = useState(null);

  useEffect(() => {
    const localDisplayIntro = localStorage.getItem("displayIntro");

    if (localDisplayIntro === "false") {
      setDisplayIntro(false);
    }
  }, []);

  const onStartButtonClick = () => {
    setDisplayIntro(false);
    localStorage.setItem("displayIntro", false);
  };

  const populateCitySelectBox = () => {
    const cities = require("../data/City_List.json").sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    });

    let cityOptions = [];

    cities.forEach((city, index) => {
      cityOptions.push(
        <option
          key={city.Code}
          name={city.Name}
          value={[parseFloat(city.X), parseFloat(city.Y)]}
        >
          {city.Name}
        </option>
      );
    });

    return cityOptions;
  };

  const handleCitySelectChange = (event) => {
    const coordinateString = event.target.value.split(",");

    // console.log(coordinateString);

    const coordinates = [
      parseFloat(coordinateString[0]),
      parseFloat(coordinateString[1]),
    ];

    setCityCoordinates(coordinates);
  };

  const onLocateTheartersClick = (event, coordinateDivRef) => {
    event.preventDefault();

    if (cityCoordinates && cityCoordinates[0] && cityCoordinates[1]) {
      coordinateDivRef.current.innerHTML = `${cityCoordinates[0]},${cityCoordinates[1]}`;
    } else {
      window.alert("אנא בחר עיר!");
    }
  };

  return (
    <Context.Provider
      value={{
        displayIntro,
        onStartButtonClick,
        populateCitySelectBox,
        cityCoordinates,
        handleCitySelectChange,
        onLocateTheartersClick,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
