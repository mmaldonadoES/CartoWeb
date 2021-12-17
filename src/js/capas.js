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

let style_media = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        fill: new ol.style.Fill({
            color: 'blue'
        })
    })
});

let style_baja = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 3,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        fill: new ol.style.Fill({
            color: 'yellow'
        })
    })
});

let style_generico = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 3,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        fill: new ol.style.Fill({
            color: 'grey'
        })
    })
});


let style_ap = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'yellow'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        points: 4,
        angle: 0,
        radius: 7,
        radius2: 7,
        radius3: 7,
        radius4: 7,
        scale: [1, 0.5],
        displacement: [15,0]
    })
});

let style_ap_linea = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 2 / Math.SQRT2,
        radius2: 2,
        points: 4,
        angle: 90,
        scale: [2, 0.5],
        displacement: [3,0]
    }),
    zindex : 100
});

let style_ap_linea_i = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 2 / Math.SQRT2,
        radius2: 2,
        points: 4,
        angle: 0,
        scale: [0.5, 1],
        displacement: [28,-5]
    })
});


let style_ap_linea_d = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 2 / Math.SQRT2,
        radius2: 2,
        points: 4,
        angle: 0,
        scale: [0.5, 1],
        displacement: [28,5]
    })
});


let style_ap_linea_a = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 2 / Math.SQRT2,
        radius2: 2,
        points: 4,
        angle: 0,
        scale: [1, 0.5],
        displacement: [23,0]
    })
});

let style_trafo = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'red'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        points: 3,
        radius: 6,
        rotation: 2*Math.PI,
        angle: 0,
        displacement: [3,10]
    })
});

let style_interruptor = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'green'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 5 / Math.SQRT2,
        radius2: 5,
        points: 4,
        angle: 0,
        scale: [1, 0.5],
        displacement: [-15,0]
    })
});

let style_interruptor_2 = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'green'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 5 / Math.SQRT2,
        radius2: 5,
        points: 4,
        angle: 0,
        scale: [1, 0.5],
        displacement: [-22,0]
    })
});



let source_Apoyos = new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: 'http://198.58.115.96:8080/maps/essa/apoyosprint/{z}/{x}/{y}.pbf',
});


var typeCache = {};
const Estilos_Energis = (feature) => {
    let array = [];

    if (feature.get('ap') != undefined) {
        array.push(style_ap);
        array.push(style_ap_linea);
        array.push(style_ap_linea_i);
        array.push(style_ap_linea_d);
        array.push(style_ap_linea_a);
    }

    if (feature.get('tipoapoyo').includes('M')) {
        array.push(style_media);
    }
    else if (feature.get('tipoapoyo').includes('B')) {
        array.push(style_baja);
    }
    else {
        array.push(style_media);
        array.push(style_baja);
    }

    if (feature.get('trafo') != 'X') {
        array.push(style_trafo);
    }

    if (feature.get('interrup') != 'X') {
        array.push(style_interruptor);
        array.push(style_interruptor_2);
    }


    return array;
};



let layer_Apoyos = new ol.layer.VectorTile({
    source: source_Apoyos,
    minZoom: 16,
    maxZoom: 20,
    style: Estilos_Energis,
});


let MapaBase = new ol.layer.Tile({
    source: new ol.source.OSM()
});