const attribution = new ol.control.Attribution({
    collapsible: false,
});


const apoyos = 
{
    "type": "FeatureCollection",
    "name": "apoyos",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
    { "type": "Feature", "properties": { "APOYO": 12057, "TIPOAPOYO": "M2", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.130848174059679, 7.134160497723367 ] } },
    { "type": "Feature", "properties": { "APOYO": 12058, "TIPOAPOYO": "5", "TRAFO": "T1", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.130914743335623, 7.134145401340987 ] } },
    { "type": "Feature", "properties": { "APOYO": 12059, "TIPOAPOYO": "5", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.130941088975291, 7.134142689315559 ] } },
    { "type": "Feature", "properties": { "APOYO": 11089, "TIPOAPOYO": "M2", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.119791795164161, 7.132961523332897 ] } },
    { "type": "Feature", "properties": { "APOYO": 11090, "TIPOAPOYO": "2V1", "TRAFO": "T2", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.119826582672047, 7.132968910382766 ] } },
    { "type": "Feature", "properties": { "APOYO": 11093, "TIPOAPOYO": "5", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.119629381566085, 7.132686787552386 ] } },
    { "type": "Feature", "properties": { "APOYO": 11005, "TIPOAPOYO": "11", "TRAFO": "X", "AP": "9", "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.127077458267692, 7.128751815788509 ] } },
    { "type": "Feature", "properties": { "APOYO": 9111, "TIPOAPOYO": "5", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.125304806100075, 7.128010425241376 ] } },
    { "type": "Feature", "properties": { "APOYO": 9118, "TIPOAPOYO": "B2", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.125407160662604, 7.128539413595398 ] } },
    { "type": "Feature", "properties": { "APOYO": 9119, "TIPOAPOYO": "5", "TRAFO": "X", "AP": null, "INTERRUP": "X" }, "geometry": { "type": "Point", "coordinates": [ -73.125452515582182, 7.128696524037305 ] } },
    ]
};    

const image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({color: 'red', width: 1}),
  });

const styles = {
    'Point': new ol.style.Style({
      image: image,
    }),
    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiLineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiPoint': new ol.style.Style({
      image: image,
    }),
    'MultiPolygon': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'yellow',
        width: 1,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 0, 0.1)',
      }),
    }),
    'Polygon': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
    'GeometryCollection': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'magenta',
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: 'magenta',
      }),
      image: new ol.style.Circle({
        radius: 10,
        fill: null,
        stroke: new ol.style.Stroke({
          color: 'magenta',
        }),
      }),
    }),
    'Circle': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0.2)',
      }),
    }),
  };

const styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
  };
  
const vectorSource = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(apoyos),
  });
  
  vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));
  
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: styleFunction,
  });


//
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

var sidebar = new ol.control.Sidebar({
    element: 'sidebar',
    position: 'left'
});

map.addControl(sidebar);
    
// Button Control
// Add a custom push button with onToggle function
var hello = new ol.control.Button({
    html: '<i class="fa fa-smile-o"></i>',
    className: "hello",
    title: "Hello world!",
    handleClick: function () {
        info("hello World!");
    }
});
map.addControl(hello);

// Show info
function info(i) {
    console.log(i);
}