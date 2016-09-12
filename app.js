
require([
  "esri/tasks/Locator",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Home",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/symbols/PictureMarkerSymbol",
  "esri/PopupTemplate",
  "esri/widgets/Search",
  "dojo/domReady!"
], function(Locator, Map, MapView, Home, Graphic, Point, PictureMarkerSymbol, PopupTemplate, Search) {

  var locatorTask = new Locator({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  });

  var map = new Map({
    basemap: "streets"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 13,
    center: [-77.0369, 38.9072]
  });

  var homeWidget = new Home({
    view: view
  });

  view.ui.add(homeWidget, "top-left");


  //Blue Raster coordinates
  var point = new Point({
    longitude: -77.086014,
    latitude: 38.891142
  });

  // Creates an image for drawing the point
  var markerSymbol = new PictureMarkerSymbol({
    url: "https://www.blueraster.com/wp-content/uploads/2014/07/blueraster-WithoutBevel-300dpi.png",
    height: "27px",
    width: "50px"
  });

  // Create a graphic and add the geometry and image to it
  var pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol
  });

  view.graphics.addMany([pointGraphic]);


  view.on("click", function(evt) {

    view.hitTest(evt.screenPoint).then(function(response){
      if(response.results[0]){

        view.popup.open({
          // Set the popup's title to the coordinates of the clicked location
          title: "Blue Raster Office"
        });
      }
      else {

        // Get the coordinates of the click on the view
        // around the decimals to 3 decimals
        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;

        view.popup.open({
          // Set the popup's title to the coordinates of the clicked location
          title: "Coordinates: [" + lon + ", " + lat + "]",
          location: evt.mapPoint // Set the location of the popup to the clicked location
        });


        // Execute a reverse geocode using the clicked location
        locatorTask.locationToAddress(evt.mapPoint).then(function(response) {


          // If an address is successfully found, print it to the popup's content;
          view.popup.content = response.address.Match_addr;
        }).otherwise(function(err) {
          // If the promise fails and no result is found, print a generic message to the popup's content
          view.popup.content = "No address was found for this location";
        });


      }
    });

  });


  var searchWidget = new Search({
    view: view
  });


  view.ui.add(searchWidget, {
    position: "top-right",
    index: 2
  });

});
