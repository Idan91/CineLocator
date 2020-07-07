var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");
var sketch;

var cityCoordinates = document.getElementById("city-coordinates");

// if (cityCoordinates) {
cityCoordinates.addEventListener("DOMSubtreeModified", (event) => {
  setTimeout(() => {
    const coordinateString = cityCoordinates.innerHTML.split(",");
    const coordinates = [
      parseFloat(coordinateString[0]),
      parseFloat(coordinateString[1]),
    ];
    zoomToCoordinates(coordinates);
  }, 500);
  // }
});
// }

closer.onclick = function () {
  container.style.display = "none";
  closer.blur();
  return false;
};
var overlayPopup = new ol.Overlay({
  element: container,
});

var expandedAttribution = new ol.control.Attribution({
  collapsible: false,
});

var mapExtent = [
  3507151.652175,
  3517716.117868,
  4373900.053584,
  4005090.772424,
];
var mapMaxZoom = 26;
var mapMinZoom = 0.5;

var map = new ol.Map({
  controls: ol.control
    .defaults({ attribution: false })
    .extend([expandedAttribution]),
  target: document.getElementById("map"),
  renderer: "canvas",
  overlays: [overlayPopup],
  layers: layersList,
  view: new ol.View({
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
  }),
});

map.getView().fit(mapExtent, map.getSize());

var NO_POPUP = 0;
var ALL_FIELDS = 1;

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
  // Determine the index that the layer will have in the popupLayers Array,
  // if the layersList contains more items than popupLayers then we need to
  // adjust the index to take into account the base maps group
  var idx =
    layersList.indexOf(layer) - (layersList.length - popupLayers.length);
  return popupLayers[idx];
}

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: collection,
    useSpatialIndex: false, // optional, might improve performance
  }),
  style: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#f00",
        width: 1,
      }),
      fill: new ol.style.Fill({
        color: "rgba(255,0,0,0.1)",
      }),
    }),
  ],
  updateWhileAnimating: true, // optional, for instant visual feedback
  updateWhileInteracting: true, // optional, for instant visual feedback
});

var doHighlight = false;
var doHover = false;

var highlight;
var onPointerMove = function (evt) {
  if (!doHover && !doHighlight) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var coord = evt.coordinate;
  var popupField;
  var currentFeature;
  var currentLayer;
  var currentFeatureKeys;
  var clusteredFeatures;
  var popupText = "<ul>";
  map.forEachFeatureAtPixel(pixel, function (feature, layer) {
    // We only care about features from layers in the layersList, ignore
    // any other layers which the map might contain such as the vector
    // layer used by the measure tool
    if (layersList.indexOf(layer) === -1) {
      return;
    }
    var doPopup = false;
    for (k in layer.get("fieldImages")) {
      if (layer.get("fieldImages")[k] != "Hidden") {
        doPopup = true;
      }
    }
    currentFeature = feature;
    currentLayer = layer;
    clusteredFeatures = feature.get("features");
    var clusterFeature;
    if (typeof clusteredFeatures !== "undefined") {
      if (doPopup) {
        for (var n = 0; n < clusteredFeatures.length; n++) {
          clusterFeature = clusteredFeatures[n];
          currentFeatureKeys = clusterFeature.getKeys();
          popupText += "<li><table>";
          for (var i = 0; i < currentFeatureKeys.length; i++) {
            if (currentFeatureKeys[i] != "geometry") {
              popupField = "";
              if (
                layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                "inline label"
              ) {
                popupField +=
                  "<th>" +
                  layer.get("fieldAliases")[currentFeatureKeys[i]] +
                  ":</th><td>";
              } else {
                popupField += '<td colspan="2">';
              }
              if (
                layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                "header label"
              ) {
                popupField +=
                  "<strong>" +
                  layer.get("fieldAliases")[currentFeatureKeys[i]] +
                  // ":</strong><br />";
                  ":</strong>";
              }
              if (
                layer.get("fieldImages")[currentFeatureKeys[i]] !=
                "ExternalResource"
              ) {
                popupField +=
                  clusterFeature.get(currentFeatureKeys[i]) != null
                    ? Autolinker.link(
                        clusterFeature
                          .get(currentFeatureKeys[i])
                          .toLocaleString(),
                        { truncate: { length: 30, location: "smart" } }
                      ) + "</td>"
                    : "";
              } else {
                popupField +=
                  clusterFeature.get(currentFeatureKeys[i]) != null
                    ? '<img src="images/' +
                      clusterFeature
                        .get(currentFeatureKeys[i])
                        .replace(/[\\\/:]/g, "_")
                        .trim() +
                      '" /></td>'
                    : "";
              }
              popupText += "<tr>" + popupField + "</tr>";
            }
          }
          popupText += "</table></li>";
        }
      }
    } else {
      currentFeatureKeys = currentFeature.getKeys();
      if (doPopup) {
        popupText += "<li><table>";
        for (var i = 0; i < currentFeatureKeys.length; i++) {
          if (currentFeatureKeys[i] != "geometry") {
            popupField = "";
            if (
              layer.get("fieldLabels")[currentFeatureKeys[i]] == "inline label"
            ) {
              popupField +=
                "<th>" +
                layer.get("fieldAliases")[currentFeatureKeys[i]] +
                ":</th><td>";
            } else {
              popupField += '<td colspan="2">';
            }
            if (
              layer.get("fieldLabels")[currentFeatureKeys[i]] == "header label"
            ) {
              popupField +=
                "<strong>" +
                layer.get("fieldAliases")[currentFeatureKeys[i]] +
                // ":</strong><br />";
                ":</strong>";
            }
            if (
              layer.get("fieldImages")[currentFeatureKeys[i]] !=
              "ExternalResource"
            ) {
              popupField +=
                currentFeature.get(currentFeatureKeys[i]) != null
                  ? Autolinker.link(
                      currentFeature
                        .get(currentFeatureKeys[i])
                        .toLocaleString(),
                      { truncate: { length: 30, location: "smart" } }
                    ) + "</td>"
                  : "";
            } else {
              popupField +=
                currentFeature.get(currentFeatureKeys[i]) != null
                  ? '<img src="images/' +
                    currentFeature
                      .get(currentFeatureKeys[i])
                      .replace(/[\\\/:]/g, "_")
                      .trim() +
                    '" /></td>'
                  : "";
            }
            popupText += "<tr>" + popupField + "</tr>";
          }
        }
        popupText += "</table></li>";
      }
    }
  });
  if (popupText == "<ul>") {
    popupText = "";
  } else {
    popupText += "</ul>";
  }

  if (doHighlight) {
    if (currentFeature !== highlight) {
      if (highlight) {
        featureOverlay.getSource().removeFeature(highlight);
      }
      if (currentFeature) {
        var styleDefinition = currentLayer.getStyle().toString();

        if (currentFeature.getGeometry().getType() == "Point") {
          var radius = styleDefinition.split("radius")[1].split(" ")[1];

          highlightStyle = new ol.style.Style({
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                color: "#ffff00",
              }),
              radius: radius,
            }),
          });
        } else if (currentFeature.getGeometry().getType() == "LineString") {
          var featureWidth = styleDefinition
            .split("width")[1]
            .split(" ")[1]
            .replace("})", "");

          highlightStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: "#ffff00",
              lineDash: null,
              width: featureWidth,
            }),
          });
        } else {
          highlightStyle = new ol.style.Style({
            fill: new ol.style.Fill({
              color: "#ffff00",
            }),
          });
        }
        featureOverlay.getSource().addFeature(currentFeature);
        featureOverlay.setStyle(highlightStyle);
      }
      highlight = currentFeature;
    }
  }

  if (doHover) {
    if (popupText) {
      overlayPopup.setPosition(coord);
      content.innerHTML = popupText;
      container.style.display = "block";
    } else {
      container.style.display = "none";
      closer.blur();
    }
  }
};

var onSingleClick = function (evt) {
  if (doHover) {
    return;
  }
  if (sketch) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var coord = evt.coordinate;
  var popupField;
  var currentFeature;
  var currentFeatureKeys;
  var clusteredFeatures;
  var popupText = "<ul>";
  map.forEachFeatureAtPixel(pixel, function (feature, layer) {
    if (
      feature instanceof ol.Feature &&
      (layer.get("interactive") || layer.get("interactive") == undefined)
    ) {
      var doPopup = false;
      for (k in layer.get("fieldImages")) {
        if (layer.get("fieldImages")[k] != "Hidden") {
          doPopup = true;
        }
      }
      currentFeature = feature;
      clusteredFeatures = feature.get("features");
      var clusterFeature;
      if (typeof clusteredFeatures !== "undefined") {
        if (doPopup) {
          for (var n = 0; n < clusteredFeatures.length; n++) {
            clusterFeature = clusteredFeatures[n];
            currentFeatureKeys = clusterFeature.getKeys();
            popupText += "<li><table>";
            for (var i = 0; i < currentFeatureKeys.length; i++) {
              if (currentFeatureKeys[i] != "geometry") {
                popupField = "";
                if (
                  layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                  "inline label"
                ) {
                  popupField +=
                    "<th>" +
                    layer.get("fieldAliases")[currentFeatureKeys[i]] +
                    ":</th><td>";
                } else {
                  popupField += '<td colspan="2">';
                }
                if (
                  layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                  "header label"
                ) {
                  popupField +=
                    "<strong>" +
                    layer.get("fieldAliases")[currentFeatureKeys[i]] +
                    // ":</strong><br />";
                    ":</strong>";
                }
                if (
                  layer.get("fieldImages")[currentFeatureKeys[i]] !=
                  "ExternalResource"
                ) {
                  popupField +=
                    clusterFeature.get(currentFeatureKeys[i]) != null
                      ? Autolinker.link(
                          clusterFeature
                            .get(currentFeatureKeys[i])
                            .toLocaleString(),
                          { truncate: { length: 30, location: "smart" } }
                        ) + "</td>"
                      : "";
                } else {
                  popupField +=
                    clusterFeature.get(currentFeatureKeys[i]) != null
                      ? '<img src="images/' +
                        clusterFeature
                          .get(currentFeatureKeys[i])
                          .replace(/[\\\/:]/g, "_")
                          .trim() +
                        '" /></td>'
                      : "";
                }
                popupText += "<tr>" + popupField + "</tr>";
              }
            }
            popupText += "</table></li>";
          }
        }
      } else {
        currentFeatureKeys = currentFeature.getKeys();
        if (doPopup) {
          popupText += "<li><table>";
          for (var i = 0; i < currentFeatureKeys.length; i++) {
            if (currentFeatureKeys[i] != "geometry") {
              popupField = "";
              if (
                layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                "inline label"
              ) {
                popupField +=
                  "<th>" +
                  layer.get("fieldAliases")[currentFeatureKeys[i]] +
                  ":</th><td>";
              } else {
                popupField += '<td colspan="2">';
              }
              if (
                layer.get("fieldLabels")[currentFeatureKeys[i]] ==
                "header label"
              ) {
                popupField +=
                  "<strong>" +
                  layer.get("fieldAliases")[currentFeatureKeys[i]] +
                  // ":</strong><br />";
                  ":</strong>";
              }
              if (
                layer.get("fieldImages")[currentFeatureKeys[i]] !=
                "ExternalResource"
              ) {
                popupField +=
                  currentFeature.get(currentFeatureKeys[i]) != null
                    ? Autolinker.link(
                        currentFeature
                          .get(currentFeatureKeys[i])
                          .toLocaleString(),
                        { truncate: { length: 30, location: "smart" } }
                      ) + "</td>"
                    : "";
              } else {
                popupField +=
                  currentFeature.get(currentFeatureKeys[i]) != null
                    ? '<img src="images/' +
                      currentFeature
                        .get(currentFeatureKeys[i])
                        .replace(/[\\\/:]/g, "_")
                        .trim() +
                      '" /></td>'
                    : "";
              }
              popupText += "<tr>" + popupField + "</tr>";
            }
          }
          popupText += "</table>";
        }
      }
    }
  });
  if (popupText == "<ul>") {
    popupText = "";
  } else {
    popupText += "</ul>";
  }

  var viewProjection = map.getView().getProjection();
  var viewResolution = map.getView().getResolution();
  for (i = 0; i < wms_layers.length; i++) {
    if (wms_layers[i][1]) {
      var url = wms_layers[i][0]
        .getSource()
        .getGetFeatureInfoUrl(evt.coordinate, viewResolution, viewProjection, {
          INFO_FORMAT: "text/html",
        });
      if (url) {
        popupText =
          popupText +
          '<iframe style="width:100%;height:110px;border:0px;" id="iframe" seamless src="' +
          url +
          '"></iframe>';
      }
    }
  }

  if (popupText) {
    overlayPopup.setPosition(coord);
    content.innerHTML = popupText;
    container.style.display = "block";
  } else {
    container.style.display = "none";
    closer.blur();
  }
};

// Idan

map.on("pointermove", function (evt) {
  var hit = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    return true;
  });
  if (hit) {
    this.getTargetElement().style.cursor = "pointer";
  } else {
    this.getTargetElement().style.cursor = "";
  }
});

map.getView().on("change:resolution", function () {
  // const resolution = map.getView().getResolution();
  // const zoom = map.getView().getZoom();
  // console.log(resolution);
  // console.log(zoom);
});

var maxExactCoordinateZoom = 19.5;

// map.on("singleclick", function (evt) {
//   onSingleClick(evt);
// });

// Click functionality
map.on("singleclick", function (event) {
  closer.onclick();
  removePin();

  var featuresInCluster = [];

  try {
    var zoomCoordinates = [0, 0];

    map.forEachFeatureAtPixel(event.pixel, function (feature) {
      // console.log(feature);

      featuresInCluster.push(feature.getProperties());
    });

    // console.log(featuresInCluster);

    var zoomCoordinates = [0, 0];

    if (featuresInCluster.length > 0 && featuresInCluster[0].Name) {
      featuresInCluster.forEach((feature) => {
        zoomCoordinates[0] += feature.geometry.flatCoordinates[0];
        zoomCoordinates[1] += feature.geometry.flatCoordinates[1];
      });

      zoomCoordinates[0] /= featuresInCluster.length;
      zoomCoordinates[1] /= featuresInCluster.length;

      var view = map.getView();
      var zoom = view.getZoom();
      var center = new ol.proj.fromLonLat(zoomCoordinates, "EPSG:4326");
      // var center = zoomCoordinates;
      var additionalZoom = 0;

      var yOffset = 0;

      if (featuresInCluster.length === 1) {
        if (zoom < 7) {
          yOffset = 140000;
        } else if (zoom >= 7 && zoom < 8) {
          yOffset = 73000;
        } else if (zoom >= 8 && zoom < 9) {
          yOffset = 48000;
        } else if (zoom >= 9 && zoom < 10) {
          yOffset = 16000;
        } else if (zoom >= 10 && zoom < 11) {
          yOffset = 8000;
        } else if (zoom >= 11 && zoom < 12) {
          yOffset = 4700;
        } else if (zoom >= 12 && zoom < 13) {
          yOffset = 1900;
        } else if (zoom >= 13 && zoom < 14) {
          yOffset = 1000;
        } else if (zoom >= 14 && zoom < 15) {
          yOffset = 575;
        } else if (zoom >= 15 && zoom < 16) {
          yOffset = 235;
        } else if (zoom >= 16 && zoom < 17) {
          yOffset = 110;
        } else if (zoom >= 17 && zoom < 18) {
          yOffset = 65;
        } else if (zoom >= 18 && zoom < 19) {
          yOffset = 42;
        } else if (zoom >= 19 && zoom < 20) {
          yOffset = 12;
        } else if (zoom >= 20 && zoom < 20.5) {
          yOffset = 8;
        } else if (zoom >= 20.5 && zoom < 21) {
          yOffset = 6.5;
        } else if (zoom >= 21 && zoom < 22) {
          yOffset = 4;
        } else if (zoom >= 22 && zoom < 23) {
          yOffset = 2;
        } else if (zoom >= 23 && zoom < 2.35) {
          yOffset = 1;
        } else if (zoom >= 23.5) {
          yOffset = 0.35;
        }

        center[1] += yOffset;
      }

      if (featuresInCluster.length > 1) {
        event.preventDefault();

        if (view.getResolution() > 0.3) {
          if (view.getResolution() > 3) {
            additionalZoom = 3;
          } else {
            additionalZoom = 2;
          }
        } else {
          if (featuresInCluster.length < 3) {
            onSingleClick(event);
          }
        }
      } else {
        onSingleClick(event);
      }

      view.animate({
        center: center,
        zoom: zoom + additionalZoom,
        minZoom: 0.2,
        maxZoom: maxExactCoordinateZoom,
        duration: 400,
      });
    }
  } catch (err) {
    console.error(err);
  }
  // map.forEachFeatureAtPixel(event.pixel, function (feature) {
  //   console.log(feature);

  //   var featuresInCluster = feature.getProperties().features;
  //   // console.log(featuresInCluster);

  //   // if (featuresInCluster !== undefined) {
  //   try {
  //     var zoomCoordinates = [0, 0];

  //     //IE support
  //     for (var i = 0; i < featuresInCluster.length; i++) {
  //       zoomCoordinates[0] += featuresInCluster[i]
  //         .getGeometry()
  //         .getCoordinates()[0];
  //       zoomCoordinates[1] += featuresInCluster[i]
  //         .getGeometry()
  //         .getCoordinates()[1];
  //     }

  //     zoomCoordinates[0] /= featuresInCluster.length;
  //     zoomCoordinates[1] /= featuresInCluster.length;

  //     var view = map.getView();
  //     var zoom = view.getZoom();
  //     var center = new ol.proj.fromLonLat(zoomCoordinates, "EPSG:4326");
  //     var additionalZoom = 0;

  //     var yOffset = 0;

  //     if (featuresInCluster.length === 1) {
  //       // console.log(zoom);
  //       if (zoom >= 13 && zoom < 15) {
  //         yOffset = 650;
  //       } else if (zoom >= 15 && zoom < 16) {
  //         yOffset = 300;
  //       } else if (zoom >= 16 && zoom < 17) {
  //         yOffset = 175;
  //       } else if (zoom >= 17 && zoom < 18) {
  //         yOffset = 75;
  //       } else if (zoom >= 18 && zoom < 19) {
  //         yOffset = 30;
  //       } else if (zoom >= 19) {
  //         yOffset = 15;
  //       }

  //       center[1] -= yOffset;
  //     }

  //     if (featuresInCluster.length > 1) {
  //       event.preventDefault();

  //       if (view.getResolution() > 0.3) {
  //         if (view.getResolution() > 3) {
  //           additionalZoom = 3;
  //         } else {
  //           additionalZoom = 2;
  //         }
  //       } else {
  //         if (featuresInCluster.length < 3) {
  //           onSingleClick(event);
  //         }
  //       }
  //     } else {
  //       onSingleClick(event);
  //     }

  //     view.animate({
  //       center: center,
  //       zoom: zoom + additionalZoom,
  //       minZoom: 0.2,
  //       maxZoom: maxExactCoordinateZoom,
  //       duration: 400,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   // }
  // });
});

var removePin = function () {
  map.removeLayer(pinLayer);
};

var zoomToCoordinates = function (coordinates) {
  // zoomTo = zoomTo || "exact";

  // console.log(coordinates);

  var view = map.getView();
  var center = new ol.proj.fromLonLat(coordinates, "EPSG:3857");

  var maxZoom = 12.5;
  var duration = 600;

  view.animate({
    center: center,
    maxZoom: maxZoom,
    zoom: maxZoom,
    duration: duration,
  });

  setTimeout(() => {
    addPin(center);
  }, duration + 100);

  // if (zoomTo === "exact") {
  //   setTimeout(function () {
  //     var pixel = map.getPixelFromCoordinate(center);

  //     // var event = {
  //     //   type: "lookup",
  //     //   coordinate: center,
  //     //   pixel: pixel,
  //     // };

  //     // Toggle popup (if feature exists)
  //     // onSingleClick(event);

  //     // Add Marker
  //     // addPin(center);
  //   }, duration + 100);
  // }
};

var pinLayer;

var addPin = function (center) {
  removePin();
  var feature = new ol.Feature(new ol.geom.Point(center));
  pinLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [feature],
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        // src: "./images/MapPin.svg",
        src: "./map/images/MapPin.png",
        offset: [-1, 125],
        scale: 0.15,
      }),
    }),
  });
  map.addLayer(pinLayer);
};

var attributionComplete = false;
map.on("rendercomplete", function (evt) {
  if (!attributionComplete) {
    var attribution = document.getElementsByClassName("ol-attribution")[0];
    var attributionList = attribution.getElementsByTagName("ul")[0];
    var firstLayerAttribution = attributionList.getElementsByTagName("li")[0];
    var qgis2webAttribution = document.createElement("li");
    qgis2webAttribution.innerHTML =
      '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a> &middot; ';
    var olAttribution = document.createElement("li");
    olAttribution.innerHTML =
      '<a href="https://openlayers.org/">OpenLayers</a> &middot; ';
    var qgisAttribution = document.createElement("li");
    qgisAttribution.innerHTML = '<a href="https://qgis.org/">QGIS</a>';
    attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
    attributionList.insertBefore(olAttribution, firstLayerAttribution);
    attributionList.insertBefore(qgisAttribution, firstLayerAttribution);
    attributionComplete = true;
  }
});
