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
  source: new ol.source.OSM(),
});

var format_Theaters = new ol.format.GeoJSON();
var features_Theaters = format_Theaters.readFeatures(json_Theaters, {
  dataProjection: "EPSG:4326",
  featureProjection: "EPSG:3857",
});

var jsonSource_Theaters = new ol.source.Vector({
  attributions: " ",
});

jsonSource_Theaters.addFeatures(features_Theaters);

// var declutter = false;
var declutter = true;

var lyr_Theaters = new ol.layer.Vector({
  declutter: declutter,
  source: jsonSource_Theaters,
  style: style_Theaters,
  interactive: true,
  title:
    'Theaters<br />\
    <img src="styles/legend/Theaters_1_0.png" /> Cinema City<br />\
    <img src="styles/legend/Theaters_1_1.png" /> HOT Cinema<br />\
    <img src="styles/legend/Theaters_1_2.png" /> yes Planet<br />\
    <img src="styles/legend/Theaters_1_3.png" /> רב-חן<br />',
});

lyr_OSMStandard_0.setVisible(true);
lyr_Theaters.setVisible(true);
var layersList = [lyr_OSMStandard_0, lyr_Theaters];
lyr_Theaters.set("fieldAliases", {
  ID: "ID",
  Name: "שם",
  Chain: "רשת",
  City: "עיר",
  Website: "אתר",
  Phone: "Phone",
  Email: "Email",
  Ticket_pri: "Ticket_pri",
  X: "X",
  Y: "Y",
});
lyr_Theaters.set("fieldImages", {
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
lyr_Theaters.set("fieldLabels", {
  Name: "header label",
  Chain: "header label",
  City: "header label",
  Website: "header label",
});
lyr_Theaters.on("precompose", function (evt) {
  evt.context.globalCompositeOperation = "normal";
});
