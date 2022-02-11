function createRow(key, value) {
    return `<tr><td>${key}</td><td>${value?value : '--'}</td></tr>`;
}

function createTable(properties) {
    const keys = ['codigoapoyo', 'pintadoapoyo', 'codigotipoapoyo', 'cantidadap', 'cantidadcondensador'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table id="propiedades">' + innerHTML + '</table>'
}

function decodeProperties(properties) {
    var decoded = `<p>codigoapoyo: ${properties['apoyo']}</p>
    <p> alumbrado: ${properties['ap']?properties['ap']:'--'} </p>
    <p> interruptor: ${properties['interrup']}</p> 
    <p> tipoapoyo: ${properties['tipoapoyo']}</p>
    <p> transformador: ${properties['trafo']}</p>`;

    return decoded;
}

function onlyApoyoLayerFilter(layer) {
    // console.log(layer.getProperties());
    return layer.get('name') == 'apoyos';
}

// Pulse feature at coord
function pulseFeature(coord) {


    const features = map.getFeaturesAtPixel(map.getPixelFromCoordinate(coord), {
        layerFilter: onlyApoyoLayerFilter,
        hitTolerance: 15
    });

    console.log(features);
    
    if (features.length == 0) {
        return;
    }
    //  const closestFeature = source_Apoyos.getClosestFeatureToCoordinate(coord);


    const closestFeature = features[0];
    const closest_coordinates = closestFeature.getFlatCoordinates();
    // const closest_latlon = ol.proj.fromLonLat(closest_coordinates);
    const properties = closestFeature.getProperties();
    // console.log(JSON.stringify(properties) + '\n');


    // content.innerHTML = decodeProperties(closestFeature.getProperties());
    content.innerHTML = createTable(properties);
    overlay.setPosition(closest_coordinates);




    var f = new ol.Feature(new ol.geom.Point(closest_coordinates));
    f.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 30,
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    }));
    map.animateFeature(f, new ol.featureAnimation.Zoom({
        fade: ol.easing.easeOut,
        duration: 3000,
        easing: ol.easing.easeOut
    }));
}

// Pulse on click 
map.on('singleclick', async (evt) => {
    if (tbInfoApoyo) {
        pulseFeature(evt.coordinate);
    }

});

// Pulse at lonlat
function pulse(lonlat) {
    var nb = $("#easing").val() == 'bounce' ? 1 : 3;
    for (var i = 0; i < nb; i++) {
        setTimeout(function () {
            pulseFeature(ol.proj.transform(lonlat, 'EPSG:4326', map.getView().getProjection()));
        }, i * 500);
    };
}