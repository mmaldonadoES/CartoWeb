document.getElementById("btnBuscarEntidad").addEventListener("click", EnviarDatosBusqueda);

function ConsultarLATLON(entidad, codigo, tipocodigo) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    fetch(backend_url + '/api/clientes/?entidad=' + entidad + '&codigo=' + codigo+ '&tipocodigo=' + tipocodigo, {
            method: 'GET', // or 'PUT'
            headers: myHeaders
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            let clientes = response.data;
            try {
                UbicarEnMapa(clientes.lat, clientes.lon);
            } catch (error) {
                alert(error);
            }
        });
}

function EnviarDatosBusqueda() {
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

    ConsultarLATLON(entidad, codigo, tipocodigo);
}
