const attribution = new ol.control.Attribution({
  collapsible: false,
});

let map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults({
      attribution: false
  }).extend([attribution]),
  layers: [MapaBase, layer_Apoyos],
  view: new ol.View({
      center: ol.proj.fromLonLat([-73.13, 7.13]),
      minZoom: 1,
      maxZoom: 20,
      zoom: 11
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