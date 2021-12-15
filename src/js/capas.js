let style_apoyos = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 3,
        stroke: new ol.style.Stroke({
            color: 'red',
            lineDash: null,
            lineCap: 'butt',
            lineJoin: 'miter',
            width: 0
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0,0,0,0.8)'
        })
    })
});

  let source_Apoyos = new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: 'http://198.58.115.96:8080/maps/essa/apoyosprint/{z}/{x}/{y}.pbf',
});

let layer_Apoyos = new ol.layer.VectorTile({
    source: source_Apoyos,
    minZoom: 16,
    maxZoom: 20,
    style: style_apoyos,
});

let MapaBase = new ol.layer.Tile({
  source: new ol.source.OSM()
});