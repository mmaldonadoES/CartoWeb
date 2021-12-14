const attribution = new ol.control.Attribution({
    collapsible: false,
});

let MapaBase = new ol.layer.Tile({
    source: new ol.source.OSM()
})

let map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({
        attribution: false
    }).extend([attribution]),
    layers: [MapaBase, vector_Apoyos],
    view: new ol.View({
        center: ol.proj.fromLonLat([-73.13, 7.13]),
        minZoom: 1,
        maxZoom: 20,
        zoom: 11
    })
});

let sidebar = new ol.control.Sidebar({
    element: 'sidebar',
    position: 'left'
});

map.addControl(sidebar);
    
// Button Control
// Add a custom push button with onToggle function
let hello = new ol.control.Button({
    html: '<i class="fa fa-smile-o"></i>',
    className: "hello",
    title: "Hello world!",
    handleClick: function () {
        showinfo("hello World!");
    }
});
map.addControl(hello);

// Show info
function showinfo(i) {
    console.log(i);
}