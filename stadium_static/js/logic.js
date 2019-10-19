// API link 
var link = "https://raw.githubusercontent.com/Mattyapolis/NFL-Home-Away-Analysis-/nlf-stadium-map/Json%20files/nflStadium.geojson"
function markersize(stadium_capacity) {
  return stadium_capacity * 15000000000;
}

// query URL and convert to json 
d3.json(link, function(data) {

  createFeatures(data.features);
});
function createFeatures(NFLdata) {
  var NFLstadiums = L.geoJSON(NFLdata, {

  // Create popup 
 onEachFeature : function (feature, layer) {
    layer.bindPopup("<h3>" + "</p>"+ "<img src=' stadium_static/js/logos/"+ feature.properties.abrv +".png' />" +"   "+ feature.properties.team +
      "</h3><hr><p>" + "</p>" + "<p> Stadium: " +  feature.properties.stadium_name +"<p> Stadium Capacity: " +  feature.properties.stadium_capacity + "</p>"+ feature.properties.stadium_location)
    },     pointToLayer: function (feature, latitude, longitude) {
      return new L.Marker(latitude, longitude)}
  });
    
  createMap(NFLstadiums);
}
function createMap(NFLstadiums) {
  var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });
  var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
  });
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
  });
  // save layers
  var basemaps = {
    "Outdoors": outdoorsmap,
    "Grayscale": graymap,
    "Dark": darkmap,
    "Satellite": satellitemap
  };
  var overmaps = {
    Stadiums: NFLstadiums
  };
  // create map
  var myMap = L.map("map", {
    center: [39.5,-98.35],
    zoom: 4.5,
    layers: [outdoorsmap, NFLstadiums]
  });
  // layers 
  L.control.layers(basemaps, overmaps, {
    collapsed: false
  }).addTo(myMap);
;
}
