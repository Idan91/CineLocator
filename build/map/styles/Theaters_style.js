var size = 0;
var placement = "point";
function categories_Theaters(
  feature,
  value,
  size,
  resolution,
  labelText,
  labelFont,
  labelFill,
  bufferColor,
  bufferWidth,
  textAlign,
  offsetX,
  offsetY,
  placement
) {
  switch (value.toString()) {
    case "Cinema City":
      return [
        new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 1,
            src: "./map/images/CinemaCityLogo.png",
            scale: 0.25,
          }),
          text: createTextStyle(
            feature,
            resolution,
            labelText,
            labelFont,
            labelFill,
            placement,
            bufferColor,
            bufferWidth,
            textAlign,
            offsetX,
            offsetY
          ),
        }),
      ];
      break;
    case "HOT Cinema":
      return [
        new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 1,
            src: "./map/images/HOTcinemaLogo_black.png",
            scale: 0.25,
          }),
          text: createTextStyle(
            feature,
            resolution,
            labelText,
            labelFont,
            labelFill,
            placement,
            bufferColor,
            bufferWidth,
            textAlign,
            offsetX,
            offsetY
          ),
        }),
      ];
      break;
    case "yes Planet":
      return [
        new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 1,
            src: "./map/images/yesPlanetLogo.png",
            scale: 0.25,
          }),
          text: createTextStyle(
            feature,
            resolution,
            labelText,
            labelFont,
            labelFill,
            placement,
            bufferColor,
            bufferWidth,
            textAlign,
            offsetX,
            offsetY
          ),
        }),
      ];
      break;
    case "רב-חן":
      return [
        new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 1,
            src: "./map/images/RavHenLogo.png",
            scale: 0.25,
          }),
          text: createTextStyle(
            feature,
            resolution,
            labelText,
            labelFont,
            labelFill,
            placement,
            bufferColor,
            bufferWidth,
            textAlign,
            offsetX,
            offsetY
          ),
        }),
      ];
      break;
  }
}

var style_Theaters = function (feature, resolution) {
  var context = {
    feature: feature,
    variables: {},
  };
  var value = feature.get("Chain");
  var labelText = "";
  size = 0;
  var labelFont = "10px, sans-serif";
  var labelFill = "#000000";
  var bufferColor = "";
  var bufferWidth = 0;
  var textAlign = "left";
  var offsetX = 8;
  var offsetY = 3;
  var placement = "point";
  if ("" !== null) {
    labelText = String("");
  }

  var style = categories_Theaters(
    feature,
    value,
    size,
    resolution,
    labelText,
    labelFont,
    labelFill,
    bufferColor,
    bufferWidth,
    textAlign,
    offsetX,
    offsetY,
    placement
  );

  return style;
};
