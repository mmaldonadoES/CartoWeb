let style_apoyos = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 4.0,
        stroke: new ol.style.Stroke({
            color: 'rgba(0,0,0,1.0)',
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
        displacement: [15, 0]
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
        displacement: [3, 0]
    }),
    zindex: 100
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
        displacement: [28, -5]
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
        displacement: [28, 5]
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
        displacement: [23, 0]
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
        rotation: 2 * Math.PI,
        angle: 0,
        displacement: [3, 10]
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
        displacement: [-15, 0]
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
        displacement: [-22, 0]
    })
});


let style_multiCliente = new ol.style.Style({
    image: new ol.style.RegularShape({
        radius: 8,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        points: 4,
        angle: Math.PI / 4
    })
});

let style_cliente = new ol.style.Style({
    image: new ol.style.RegularShape({
        radius: 4,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 0
        }),
        fill: new ol.style.Fill({
            color: 'yellow'
        }),
        points: 4,
        angle: Math.PI / 4
    })
});

const estilosCliente = (feature) => {
    var coord = feature.getFlatCoordinates().toString();
    let estilo = [];
    if (feature.get('cantidad') == 1) {
        estilo.push(style_cliente);
    } else {
        estilo.push(style_cliente);
        estilo.push(style_multiCliente);
    }
    return estilo;
};

let estiloAcometida = new ol.style.Style({
    stroke: new ol.style.Stroke({
        width: 1,
        color : 'gray'
    })
});


// CAPAS
// ---------------------------------------------------------------------------------------------------------------------
// SOURCES
let source_Apoyos = new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: tiles_server + capa_apoyos,
})

let source_Clientes = new ol.source.VectorTile({
    format: new ol.format.MVT(),
    url: tiles_server + capa_clientes,
});



// LAYERS
// let layer_Apoyos = new ol.layer.VectorTile({
//     name: 'apoyos',
//     source: source_Apoyos,
//     minZoom: 17,
//     maxZoom: 20,
//     style: style_apoyos,
// });

// let layer_clientes = new ol.layer.VectorTile({
//     name: 'clientes',
//     source: source_Clientes,
//     minZoom: 18,
//     maxZoom: 20,
//     style: estilosCliente,  
// });

// const mapaBase = new ol.layer.Tile({
//   source: new ol.source.OSM()
// });




// MAPAS BASES
  // A group layer for base layers
var baseLayers   = new ol.layer.Group({
    title: 'Mapas Base',
    openInLayerSwitcher: true,
    layers: [
        new ol.layer.Tile({
            title: "OSM",
            baseLayer: true,
            source: new ol.source.OSM(),
            visible: true
        }),
        new ol.layer.Tile({
            title: "Toner",
            baseLayer: true,
            visible: false,
            source: new ol.source.Stamen({ layer: 'toner' })
        })
    ]
});


