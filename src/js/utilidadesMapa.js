document.getElementById("btnBuscarEntidad").addEventListener("click",()=>EnviarDatosBusqueda);


function BuscarApoyoCartografia() {
  $modal_mapa = document.getElementById('buscar_apoyo');



  $modal_mapa.addEventListener('click', async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Buscar por Coordenadas',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      html:
        ' <div class="mb-3">' +
        '<Label>Geometricas</label>' +
        '<input id="swal-input_radio1" checked="checked" type="radio" name="coordenadas" class="swal2-input">' +
        '</div>' +
        ' <div class="mb-3">' +
        '<Label>Latitud</label>' +
        '<input type="number" id="swal-input1" class="swal2-input">' +
        '</div>' +
        ' <div class="mb-3">' +
        '<Label>Longitud</label>' +
        '<input type="number" id="swal-input2" class="swal2-input">' +
        '</div>' +
        ' <div class="mb-3">' +
        '<Label>Planas</label>' +
        '<input id="swal-input2_radio2" type="radio" name="coordenadas" class="swal2-input">' +
        '</div>' +
        ' <div class="mb-3">' +
        '<Label>X</label>' +
        '<input type="number" id="swal-input3" class="swal2-input">' +
        '</div>' +
        ' <div class="mb-3">' +
        '<Label>Y</label>' +
        '<input type="number" id="swal-input4" class="swal2-input">' +
        '</div>',
      focusConfirm: true,
      preConfirm: () => {

        let lon = document.getElementById('swal-input2').value;
        let lat = document.getElementById('swal-input1').value;
        if (document.getElementById("swal-input_radio1").checked) {
          if ((lat > 0 && lat < 13) && (lon < -66 && lon > -79)) {
              UbicarEnMapa(lat, lon);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Fuera de rango',
              text: 'Las coordenadas que intenta ingresar estan fuera de Colombia, por lo tanto no es posible ubicarlas.'
            });
          }
 
        } else {
          let x = document.getElementById('swal-input3').value;
          let y = document.getElementById('swal-input4').value;
          UbicarEnMapaXY(x, y);
        }

      }
    });

  });
};

function UbicarEnMapa(lat, lon) {
  const lugar = ol.proj.fromLonLat([lon, lat]);
  map.getView().setCenter(lugar);
  // map.getView().setZoom(16);
  pulse(lugar);
}



function UbicarEnMapaXY(x, y) {
  proj4.defs("EPSG:3116","+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  ol.proj.proj4.register(proj4);

  let MagnaSirgas = ol.proj.get('EPSG:3116');
  // let XY = ol.proj.get('EPSG:4326');

  let x_c = parseFloat(x);
  let y_c = parseFloat(y);

  
  
  let lugar2 = ol.proj.fromLonLat(ol.proj.transform([x_c,y_c], MagnaSirgas, 'EPSG:4326'));
  map.getView().setCenter(lugar2);
  // map.getView().setZoom(16);

  pulse(ol.proj.transform([x_c,y_c], MagnaSirgas, 'EPSG:4326'))

}


const  ConsultarLATLON = async (entidad, codigo, tipocodigo)  =>{

  const apiClient = new ApiClient(backend_url, x_api_key);
    const token = await apiClient.getToken();
    // console.log(token);
    // sessionStorage.setItem('token', token.data.token);
    await apiClient.setToken(token.data.token);
    apiClient.getBusquedaCapaNegocio(entidad,codigo,tipocodigo).then(response => {
        let clientes = response.data;
        try {
            UbicarEnMapa(clientes.lat, clientes.lon);
        } catch (error) {
            alert(error);
        }

    });
      
}

const EnviarDatosBusqueda = async () => {
    let codigo = document.getElementById('CajaCodigoABuscar').value;
    if (document.getElementById('RadioApoyo').checked) {
        let entidad = 'apoyo';
    }
    if (document.getElementById('RadioTrafodis').checked) {
        let entidad = 'trafodis';
    }
    if (document.getElementById('RadioCliente').checked) {
        let entidad = 'cliente';
    }
    if (document.getElementById('RadioTramoMT').checked) {
        let entidad = 'tramomt';
    }
    if (document.getElementById('RadioTramoBT').checked) {
        let entidad = 'tramobt';
    }
    if (document.getElementById('RadioSubestacion').checked) {
        let entidad = 'subestacion';
    }
    if (document.getElementById('RadioCodigoInterno').checked) {
        let tipocodigo = 'interno';
    }
    if (document.getElementById('RadioCodigoExterno').checked) {
        let tipocodigo = 'externo';
    }

   await ConsultarLATLON(entidad, codigo, tipocodigo);
}