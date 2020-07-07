import React, { Component } from "react";
class Map extends Component {
  state = {
    scriptSrc: [`./map/resources/qgis2web.js?v=${Date.now()}`],
    styleSrc: [
      `./map/resources/ol.css?v=${Date.now()}`,
      `./map/resources/fontawesome-all.min.css?v=${Date.now()}`,
      `./map/resources/ol3-layerswitcher.css?v=${Date.now()}`,
      `./map/resources/qgis2web.css?v=${Date.now()}`,
      `./map/resources/map.css?v=${Date.now()}`,
    ],
  };

  componentDidMount() {
    // Script and CSS injection on mount - solves OpenLayers Webmap not appearing
    this.state.scriptSrc.forEach((src) => {
      const script = document.createElement("script");

      script.src = src;
      script.classList.add("mounted");
      script.async = true;

      document.head.appendChild(script);
    });

    this.state.styleSrc.forEach((src) => {
      const link = document.createElement("link");

      link.href = src;
      link.classList.add("mounted");
      link.rel = "stylesheet";

      document.head.appendChild(link);
    });
  }

  componentWillUnmount = () => {
    const addedTags = Array.from(document.getElementsByClassName("mounted"));

    addedTags.forEach((tag) => {
      tag.parentNode.removeChild(tag);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="map-container">
          <div id="map">
            <div id="popup" className="ol-popup">
              <a href="/#" id="popup-closer" className="ol-popup-closer">
                {""}
              </a>
              <div id="popup-content"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
