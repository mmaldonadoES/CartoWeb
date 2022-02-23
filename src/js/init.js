let grupo_capas;

const loadCapAbilities = async () => {

    fetch(tiles_server + "capabilities/essa.json", { method: 'GET' })
    .then(response => response.json())
    .then(result => paintCapAbilities(result.vector_layers))
    .catch(error => console.log('error', error));
    
}

// loadCapAbilities();

const paintCapAbilities = async (vector_layers) => {
  
  let layers = [];
  


  for (i = 0; i < vector_layers.length; i++) {
    geometry = vector_layers[i].geometry_type;
    id = vector_layers[i].id;

    let style_layer;

    switch(id){
      case 'apoyos':
          style_layer = style_apoyos;
          break;
    //   case 'tramobt':
    //       style_layer = style_ap_linea;
    //       break;
    //   case 'tramomt':
    //       style_layer = style_ap_linea;
    //       break;
      case 'trafos':
          style_layer = style_trafo;
          break;   
      case 'clientes':
          style_layer = estilosCliente;
          break;          
      case 'acometidas':
            style_layer = estiloAcometida;
          break;      
    }

    if(id !== 'departamento'){
        let source = new ol.source.VectorTile({
        url: vector_layers[i].tiles[0],
            format: new ol.format.MVT(),
        });

      let layer = new ol.layer.VectorTile({
        name: vector_layers[i].name,
        source: source,
        minZoom: parseInt(vector_layers[i].minzoom) + 1,
        maxZoom: vector_layers[i].maxzoom,
        style: style_layer,
      });

      layers.push(layer);

    }   
  }

// GRUPOS DE CAPAS
  grupo_capas =  new ol.layer.Group({
    title: 'Capas Base',
    layers: layers
  })
    
    map.addLayer(grupo_capas);
}

