  // Pulse feature at coord
function pulseFeature(coord) {
      
   
    const features = map.getFeaturesAtPixel(map.getPixelFromCoordinate(coord), { hitTolerance: 15 });
    if (features.length == 0) {
       return;  
    }
    //  const closestFeature = source_Apoyos.getClosestFeatureToCoordinate(coord);

    const closestFeature = features[0];
    console.log(closestFeature);


      var f = new ol.Feature(new ol.geom.Point(coord));
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
  map.on('singleclick', function (evt) {
      pulseFeature(evt.coordinate);
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