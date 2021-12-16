const attribution = new ol.control.Attribution({
    collapsible: false,
});

var map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({
        attribution: false
    }).extend([attribution]),
    layers: [
        new ol.layer.Tile({
            // Esto es el mapa Base
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-73.10, 7.07]),
        zoom: 16
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

// Posición del Mouse 
const mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(8),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
  });
  map.addControl(mousePositionControl);