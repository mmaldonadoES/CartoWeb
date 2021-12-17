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
        radius: 10,
        radius2: 10,
        radius3: 10,
        radius4: 10,
        scale: [1, 0.5],
        displacement: [15,0]
    })
});


/*
const circle = new ol.style.Circle({
    radius: 5,
    stroke: new ol.style.Stroke({
        color: 'yellow',
        width: 0
    }),
    fill: new ol.style.Fill({
        color: 'yellow'
    })
});

// fromCircle is a function inside Polygon class
const ellipse = ol.geom.Polygon.fromCircle(circle, 100);
ellipse.scale(1, 5 / 2); 

// OL is counterclockwise rotation
ellipse.rotate(-(1/2 * Math.PI) / 180, circle.getCenter());


// falta
let style_ap = ellipse;
*/
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
        radius: 5,
        rotation: Math.PI / 4,
        angle: 0,
        displacement: [-5,10]
    })
});

let style_interruptor = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'red'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        radius: 10 / Math.SQRT2,
        radius2: 10,
        points: 4,
        angle: 0,
        scale: [1, 0.5],
        displacement: [-15,0]
    })
})


let source_Apoyos = new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: 'http://198.58.115.96:8080/maps/essa/apoyosprint/{z}/{x}/{y}.pbf',
});


var typeCache = {};
const Estilos_Energis = (feature) => {
    let array = [];

    if (feature.get('ap') != undefined) {
        array.push(style_ap);
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