var wms_layers = [];

var lyr_OSMStandard_0 = new ol.layer.Tile({
  title: "OSM Standard",
  type: "base",
  opacity: 1.0,

  //   source: new ol.source.XYZ({
  //     attributions:
  //       ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
  //     url: "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
  //   }),
  source: new ol.source.OSM({
    crossOrigin: null,
  }),
});

var Theaters_Clusters = [];
var Theaters_Layers = [];

// var declutter = true;
var declutter = false;

var theatersClusterDistance_cluster_1 = 20000;
var theatersMaxResolution_cluster_1 = 80000;
var theatersMinResolution_cluster_1 = 600;

var theatersClusterDistance_cluster_2 = 90;
var theatersMaxResolution_cluster_2 = theatersMinResolution_cluster_1;
var theatersMinResolution_cluster_2 = 200;

var theatersClusterDistance_cluster_3 = 60;
var theatersMaxResolution_cluster_3 = theatersMinResolution_cluster_2;
var theatersMinResolution_cluster_3 = 80;

var theatersClusterDistance_cluster_4 = 50;
var theatersMaxResolution_cluster_4 = theatersMinResolution_cluster_3;
var theatersMinResolution_cluster_4 = 20;

var theatersClusterDistance_cluster_5 = 30;
var theatersMaxResolution_cluster_5 = theatersMinResolution_cluster_4;
var theatersMinResolution_cluster_5 = 3;

var theatersClusterDistance_cluster_6 = 20;
var theatersMaxResolution_cluster_6 = theatersMinResolution_cluster_5;
var theatersMinResolution_cluster_6 = 0;

var format_Theaters = new ol.format.GeoJSON();

var features_Theaters = format_Theaters.readFeatures(json_Theaters, {
  dataProjection: "EPSG:4326",
  featureProjection: "EPSG:3857",
});

var jsonSource_Theaters = new ol.source.Vector({
  attributions: " ",
});

jsonSource_Theaters.addFeatures(features_Theaters);

// Cluster_1
var cluster_1_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_1,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push;

var lyr_1_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_1,
  minResolution: theatersMinResolution_cluster_1,
  source: cluster_1_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_1_Theaters);

// Cluster_2
var cluster_2_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_2,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push(cluster_2_Theaters);

var lyr_2_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_2,
  minResolution: theatersMinResolution_cluster_2,
  source: cluster_2_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_2_Theaters);

// Cluster_3
var cluster_3_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_3,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push(cluster_3_Theaters);

var lyr_3_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_3,
  minResolution: theatersMinResolution_cluster_3,
  source: cluster_3_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_3_Theaters);

// Cluster_4
var cluster_4_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_4,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push(cluster_4_Theaters);

var lyr_4_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_4,
  minResolution: theatersMinResolution_cluster_4,
  source: cluster_4_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_4_Theaters);

// Cluster_5
var cluster_5_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_5,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push(cluster_5_Theaters);

var lyr_5_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_5,
  minResolution: theatersMinResolution_cluster_5,
  source: cluster_5_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_5_Theaters);

// Cluster_6
var cluster_6_Theaters = new ol.source.Cluster({
  distance: theatersClusterDistance_cluster_6,
  source: jsonSource_Theaters,
});
Theaters_Clusters.push(cluster_6_Theaters);

var lyr_6_Theaters = new ol.layer.Vector({
  declutter: declutter,
  maxResolution: theatersMaxResolution_cluster_6,
  minResolution: theatersMinResolution_cluster_6,
  source: cluster_6_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});
Theaters_Layers.push(lyr_6_Theaters);

// lyr_OSMStandard_0.setVisible(true);
// lyr_Theaters_1.setVisible(true);

// var layersList = [lyr_OSMStandard_0, lyr_Theaters_1];
var layersList = [lyr_OSMStandard_0, lyr_1_Theaters];

layersList.forEach((layer, index) => {
  if (index > 0) {
    layer.set("fieldAliases", {
      ID: "ID",
      Name: "שם",
      Chain: "רשת בתי קולנוע",
      City: "עיר",
      Website: "אתר",
      Phone: "Phone",
      Email: "Email",
      Ticket_pri: "Ticket_pri",
      X: "X",
      Y: "Y",
    });
    layer.set("fieldImages", {
      ID: "Hidden",
      Name: "TextEdit",
      Chain: "TextEdit",
      City: "TextEdit",
      Website: "TextEdit",
      Phone: "Hidden",
      Email: "Hidden",
      Ticket_pri: "Hidden",
      X: "Hidden",
      Y: "Hidden",
    });
    layer.set("fieldLabels", {
      Name: "header label",
      Chain: "header label",
      City: "header label",
      Website: "header label",
    });
    layer.on("precompose", function (evt) {
      evt.context.globalCompositeOperation = "normal";
    });
  }

  layer.setVisible(true);
});

// lyr_Theaters_1.set("fieldAliases", {
//   ID: "ID",
//   Name: "שם",
//   Chain: "רשת בתי קולנוע",
//   City: "עיר",
//   Website: "אתר",
//   Phone: "Phone",
//   Email: "Email",
//   Ticket_pri: "Ticket_pri",
//   X: "X",
//   Y: "Y",
// });
// lyr_Theaters_1.set("fieldImages", {
//   ID: "Hidden",
//   Name: "TextEdit",
//   Chain: "TextEdit",
//   City: "TextEdit",
//   Website: "TextEdit",
//   Phone: "Hidden",
//   Email: "Hidden",
//   Ticket_pri: "Hidden",
//   X: "Hidden",
//   Y: "Hidden",
// });
// lyr_Theaters_1.set("fieldLabels", {
//   Name: "header label",
//   Chain: "header label",
//   City: "header label",
//   Website: "header label",
// });
// lyr_Theaters_1.on("precompose", function (evt) {
//   evt.context.globalCompositeOperation = "normal";
// });
