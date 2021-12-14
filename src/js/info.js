
const info = document.getElementById('info');

const doShowInfo = false;

const currentMapSize = (info, x, y) => {
    let wmax;
    let hmax;
    [wmax, hmax] = map.getSize();
    const clientWidth = info.clientWidth + 5;
    const clientHeight = info.clientHeight + 5;
    if (x + clientWidth > wmax) {
        x = wmax - clientWidth;
    }
    if (y + clientHeight > hmax) {
        y = hmax - clientHeight;
    }
    return [x, y];
};

function showInfo(event) {
    const zoom = map.getView().getZoom();
    if (!doShowInfo || (zoom<18)) {
        return;
    }

    
    // console.log(`zoom: ${zoom}`);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';

    var features = map.getFeaturesAtPixel(event.pixel);
    if (features.length == 0) {
        info.innerText = '';
        info.style.opacity = 0;
        return;
    }

    var properties = features[0].getProperties();
    // console.log(properties);
    if (properties.hasOwnProperty('geometry')) {
        delete properties.geometry;
    }
    let x, y = 0;

    info.innerHTML = Object.keys(properties).map(key => (`<p>${key}:${properties[key]}</p>`)).join('\n')
    info.style.opacity = 1;
    [x, y] = currentMapSize(info, event.pixel[0], event.pixel[1]);
    // console.log(x, y);
    info.style.left = x + 'px';
    info.style.top = y + 'px';
}


map.on(['pointermove'], showInfo);
