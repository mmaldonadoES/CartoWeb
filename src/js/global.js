let tbInfoApoyo;
// active only debug
tbInfoApoyo = true    //<---- controla la activacion de la info de apoyos


function setGlobarVariables(data) {
    
    if (data.type == 'button') {
        tbInfoApoyo = (data.value.toLowerCase() === 'true');
        closeNav(-1);
        // console.log(data);
    }
}



////////////////////////////////////////////////////////////////////////////////////////////
// -------------------PARAMETROS DE CONFIGURACION ----------------------------------
// SERVIDOR DE CAPAS
// http://192.168.0.31:8880/capabilities/essa.json   <---- ruta para ver los tiles activos
const tiles_server = 'http://192.168.0.31:8880/';
const capa_apoyos = 'maps/essa/apoyos/{z}/{x}/{y}.pbf';  //><-----se va a cambiar cuando exista una api de capas


// -------------------PARAMETROS DE CONFIGURACION ----------------------------------
// BACKEND 
const backend_url = 'https://worker360.electrosoftware.net:3002';
const x_api_key = 'eyJjdXMiOjY1LCJpYXQiOj'    


class ApiClient {
    constructor(url, x_api_key) {
        this.url = url;
        this.x_api_key = x_api_key;
        this.myHeaders = new Headers();
        this.myHeaders.append("x-api-key", this.x_api_key);
        this.myHeaders.append("Content-Type", "application/json");


    }

    setToken(token) {
        this.myHeaders = null;
        this.myHeaders = new Headers();
        this.myHeaders.append("x-api-key", this.x_api_key);
        this.myHeaders.append("Content-Type", "application/json");
        this.myHeaders.append("Authorization", "Bearer " + token);
    }

    async getToken() {
        const url = this.url + '/api/users/login';

        const raw = JSON.stringify({
        "loginusuario": "JTRUJIG",
        "contrasenaweb": "JTRUJIG"
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: this.myHeaders,
            body: raw
        });
        return await response.json();
    }

    async getApoyo(id) {
        const url = this.url + '/api/apoyo/byPintado/' + id;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.myHeaders
        });
        return await response.json();
    }

}

//ELIMINAR PARA PROBAR

// var myFunc = async function() {

//     const apiClient = new ApiClient(backend_url, x_api_key);
//     const token = await apiClient.getToken();
//     // console.log(token);
//     sessionStorage.setItem('token', token.data.token);
//     await apiClient.setToken(token.data.token);
//     const apoyo = await apiClient.getApoyo(1084534);
//     console.log(apoyo);

// }();