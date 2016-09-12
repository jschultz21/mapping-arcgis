
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Home",
  "dojo/domReady!"
], function(Map, MapView, Home) {

  var map = new Map({
    basemap: "streets"
  });

  // Additional basemap options are: satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic. Use alternate basemaps by modifying the basemap option in the sandbox. View the Map class for more details on additional map options.

  var view = new MapView({
    container: "viewDiv",  // Reference to the DOM node that will contain the view
    map: map,               // References the map object created in step 3
    zoom: 9,  // Sets the zoom level based on level of detail (LOD)
    center: [-77.0369, 38.9072]  // Sets the center point of view in lon/lat
  });
//
var homeWidget = new Home({
  view: view
});

view.ui.add(homeWidget, "top-left");

});
