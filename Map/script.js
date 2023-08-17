// creating the Base tile layers
var  OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
var  OSM_ATTRIB  =  '&copy;  <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';  
var  osmLayer  =  L.tileLayer(OSM_URL,  {attribution:  OSM_ATTRIB});  

var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});



// creating the AQI station_layer which gives us the live aqi labels
var  WAQI_URL    =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=53bc2adc5156eabc20305e85d3834c90e654f646";  
var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';  
var  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution:  WAQI_ATTR});  

// creating the heatmap over layer
var Heatmap = L.tileLayer('https://tiles.breezometer.com/v1/air-quality/breezometer-aqi/current-conditions/{z}/{x}/{y}.png?key=' + (config.BreezoMeter_apiKey === '' ? alert(errorMessage) : config.BreezoMeter_apiKey), {
            tms: false,
            opacity: 0.65,
            maxNativeZoom: 8
        });

// creating the base and overlay variable and placeing the
let baselayerMaps = {
    "OpenStreets": osmLayer,
    "NatGeo World Map": Esri_NatGeoWorldMap,
    "sdf": Stamen_Toner
}
let overlayMaps = {
    "Heatmap": Heatmap,
    "AQI_Stations": waqiLayer
};
// setting up our map and giving it Torontos coordinates
var  map  =  L.map('map', {
    center: [43.6532,  -79.3832],  
    zoom: 11,
    layers:[osmLayer, waqiLayer]
}); 

// creating our control layer
L.control.layers(baselayerMaps, overlayMaps).addTo(map);
