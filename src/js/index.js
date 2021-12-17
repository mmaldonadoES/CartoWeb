let JSON = [];

const userAction = async () => {
    const response = await fetch('http://127.0.0.1:5500/src/api/servers.json');
    data =  await response.json(); 
    JSON = await data;

    select = document.getElementById('selecetMapaBase');
    
    for (let i = 0; i <= JSON.length - 1; i++) {
        let opt = document.createElement('option');
        opt.value = JSON[i].code;
        opt.innerHTML = JSON[i].name;
        select.appendChild(opt);
        console.log(JSON[i]);
    }
  }

userAction();
