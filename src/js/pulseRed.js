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

function decodeTableClientes(properties) {
    const keys = ['CODIGOCLIENTESGD', 'CODIGOTRAFODIS', 'CODIGO_CUENTA', 'DIRECCIONSUSCRIPTOR', 'NOMBRESUSCRIPTOR'];
    let innerHTML = ``;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return  innerHTML;
}

const hidePopUp = () => {
    document.getElementById('popup').classList.add('hidden');
}

const showPopUp = () => {
    if (document.getElementById('popup').classList.contains('hidden')) {
        document.getElementById('popup').classList.remove('hidden');
    }
}


const MostrarModal = async (properties) => {
    // antiguo MostrarModal
    if (document.getElementById('costumer').classList.contains('active')) {
    } else {
        element = document.getElementById("costumer").classList.remove("disabled");
        document.getElementById('costumer_a').click();
    }
    document.getElementById("costumers_tbody").innerHTML = "";


    const apiClient = new ApiClient(backend_url, x_api_key);
    const token = await apiClient.getToken();
    // console.log(token);
    // sessionStorage.setItem('token', token.data.token);
    await apiClient.setToken(token.data.token);
    apiClient.getClientes(properties['long'], properties['lat']).then(response => {
        const clientes = response.data;
        // console.log(response.data.length);
        for (var i = 0; i < clientes.length; i++) {
            console.log(clientes[i]);
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${clientes[i]['CODIGOCLIENTESGD']}</td><td>${clientes[i]['NOMBRESUSCRIPTOR']}</td><td>${clientes[i]['NOMBRESUSCRIPTOR']}</td>`;
            document.getElementById("costumers_tbody").appendChild(tr);
        }

    });


}
// EVENTO SEGUN EL TIPO DE CAPAS
function switchEvent(properties) {
    //check if properties object has a property called 'apoyo'
    showPopUp();
    if (properties.hasOwnProperty('codigoapoyo')) {
        // console.log('apoyo');
        container_content.innerHTML = createTable(properties);
        return;
    } else if (properties.hasOwnProperty('geohash')) {
        // console.log('cliente');
        hidePopUp();
        container_content.innerHTML = '';
        MostrarModal(properties);
        return;
    }

}

// SOLO LOS LAYERS QUE RETORNEN TRUE SERAN ATENDIDOS EN EL PULSE CLICK
function onlyApoyoLayerFilter(layer) {
    const list_layers = ['apoyos', 'clientes', 'trafos', 'interruptores'];
    return list_layers.includes(layer.get('name'));
}

// Pulse feature at coord
const pulseFeature =  async(coord) => {


    const features = map.getFeaturesAtPixel(map.getPixelFromCoordinate(coord), {
        layerFilter: onlyApoyoLayerFilter,
        hitTolerance: 15
    });

    

    if (features.length == 0) {
        return;
    }
    //  const closestFeature = source_Apoyos.getClosestFeatureToCoordinate(coord);
    // console.log(features[0].getProperties());

    const closestFeature = features[0];
    const closest_coordinates = closestFeature.getFlatCoordinates();
    // const closest_latlon = ol.proj.fromLonLat(closest_coordinates);
    const properties = closestFeature.getProperties();
    // console.log(JSON.stringify(properties) + '\n');


    switchEvent(properties);   /// <--- CODIFICAR LOS DATOS DE LAS PROPIEDADES SEGUN LA CAPA
    // content.innerHTML = createTable(properties);
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