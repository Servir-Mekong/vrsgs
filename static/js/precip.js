var wmsLayer;
$("#hist-layer-opacity").slider();
// $('#cmorphSlider').hide();
// $('#imergSlider').show();

const cdate = new Date(); 
const yesterday = cdate.setDate(cdate.getDate() - 2)
const hist_date = new Date(yesterday).toISOString().split('T')[0]//.replace("-", "").replace("-", "");

var dateVal = document.getElementById("selected_date");
dateVal.value = hist_date;

var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + hist_date.replace("-", "").replace("-", "") + '-S000000-E235959.V05';
wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
    layers: 'imerg:'+imerg_lyr,
    format: 'image/png',
    transparent: true,
    styles: 'virtual_rain_style',
}).addTo(map);

// $('input[type=radio][name=precipOptions]').change(function() {
//     var precip_type = this.value;
//     var getHistDate = document.getElementById("selected_date").value;
//     // console.log(getDate)
//     // console.log(precip_type)
//     if (map.hasLayer(wmsLayer)){
//         map.removeLayer(wmsLayer)
//     }
//     if (precip_type == 'cmorph') {
//         var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ getHistDate.replace("-", "").replace("-", "");
//         wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//             layers: 'cmorph:'+cmorph_lyr,
//             format: 'image/png',
//             transparent: true,
//             styles: 'virtual_rain_style',
//         }).addTo(map);
//     }
//     else if (precip_type == 'imerg') {
//         var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + getHistDate.replace("-", "").replace("-", "") + '-S000000-E235959.V05';
//         wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//             layers: 'imerg:'+imerg_lyr,
//             format: 'image/png',
//             transparent: true,
//             styles: 'virtual_rain_style',
//         }).addTo(map);
//     }
// });

$('input[type=date]').change(function () {
    var getDate =  document.getElementById("selected_date").value;
    // console.log(getDate)
    var getPrecipType = document.querySelector('input[name="precipOptions"]:checked').value;
    // console.log( getPrecipType)
    if (map.hasLayer(wmsLayer)){
        map.removeLayer(wmsLayer)
    }
    if (getPrecipType == 'cmorph') {
        var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ getDate.replace("-", "").replace("-", "");
        wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'cmorph:'+cmorph_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
    }
    else if (getPrecipType == 'imerg') {
        var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + getDate.replace("-", "").replace("-", "") + '-S000000-E235959.V05';
        wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'imerg:'+imerg_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
    }
});
// Get layer slider value
$("#hist-layer-opacity").on("slide", function(slideEvt) {
    //console.log(slideEvt.value);
    var opac = slideEvt.value
    wmsLayer.setOpacity(opac);
});
