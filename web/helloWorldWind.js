var wwd = new WorldWind.WorldWindow("canvasOne");
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
wwd.addLayer(placemarkLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageScale = 1;
placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

var position = new WorldWind.Position(4.2105, 101.9758, 100.0);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

// placemark.label = "Placemark\n" +
//     "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
//     "Lon " + placemark.position.longitude.toPrecision(5).toString();
// placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(placemark);

const iss_url = 'https://data.nasa.gov/resource/dd9e-wu2v.json';
async function getISS() {
    //let final;
    const response = await fetch(iss_url);
    const data = await response.json();
    console.log(data);
    // let lati1=json.parse(data);
    // var aaa=JSON.parse(data);
    // console.log(aaa);
    console.log(data[0]);
    var country = [];
    var latitude = [];
    var longtitude = [];
    for (var i in data) {
        // console.log("Country " + data[i].country_name);
        // console.log("lati " + data[i].latitude);
        // console.log("long " + data[i].longitude);
        let countryName = data[i].country_name;
        let lati = data[i].latitude;
        let long = data[i].longitude;
        wwd.navigator.range = 13000; // 2 million meters above the ellipsoid
        var position = new WorldWind.Position(lati, long, 100.0);
        var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);
        placemarkLayer.addRenderable(placemark)
        wwd.redraw();
        country[i] = countryName;
        latitude[i] = lati;
        longtitude[i] = long;
        
        var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;

        placemark.highlightAttributes = highlightAttributes;

   
     
        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);

        // Now set up to handle highlighting.
        var highlightController = new WorldWind.HighlightController(wwd);

        // Create a layer manager for controlling layer visibility.
        //var layerManager = new LayerManager(wwd);
            


    console.log("aa " + JSON.stringify(country[1]) + " " + JSON.stringify(latitude[1]) + " " + JSON.stringify(longtitude[1]));
     
    }
}
getISS();
// console.log("aa " + country[1] + " " + latitude[1] + " " + longtitude[1]);
// wwd.navigator.lookAtLocation.latitude = 3.910997;
// wwd.navigator.lookAtLocation.longitude = 101.650567;
// wwd.navigator.range = 13000; // 2 million meters above the ellipsoid
// var position = new WorldWind.Position(50.910997, 101.650567, 10.0);
// var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);
// placemarkLayer.addRenderable(placemark)
//wwd.redraw();