var wmsLayer;

const today= new Date();
const previous_day = today.setDate(today.getDate() - 2)
const vtd = new Date(previous_day)
const current_date = vtd.toISOString().split('T')[0].replace("-", "").replace("-", "");
// console.log(current_date);

var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ current_date;
wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
    layers: 'cmorph:'+cmorph_lyr,
    format: 'image/png',
    transparent: true,
    styles: 'virtual_rain_style',
}).addTo(map);

$('input[type=radio][name=precipOptions]').change(function() {
    // map.eachLayer(function (layer) {
    //     map.removeLayer(layer);
    // });  
    if (map.hasLayer(wmsLayer)){
        map.removeLayer(wmsLayer)
    }
    // map.addLayer(basemap_layer);
    var precip_type = this.value;
    if (precip_type == 'cmorph') {
        var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ current_date;
        wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'cmorph:'+cmorph_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
    }
    else if (precip_type == 'imerg') {
        var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + current_date + '-S000000-E235959.V05';
        imergLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'imerg:'+imerg_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
    }
});
