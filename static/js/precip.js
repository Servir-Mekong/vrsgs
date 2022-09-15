$('#cmorphSlider').show();
$('#imergSlider').hide();

function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    // Exclude start date
    date.setDate(date.getDate() + 1);
    const dates = [];
    // Exclude end date
    while (date < endDate) {

      dates.push(new Date(date).toISOString().split('T')[0].replace("-", "").replace("-", ""));
      date.setDate(date.getDate() + 1);
    }
    return dates;
}  
const td = new Date(); // "2022-08-14"
const priorDate = td.setDate(td.getDate() - 5)
// const nd = new Date(priorDate).toISOString().split('T')[0].replace("-", "").replace("-", "");

const td2 = new Date();
const endDate = td2.setDate(td2.getDate() ) //+ 1

const d1 =  new Date(priorDate);
const d2 = new Date(endDate); //"2022-08-15"

const dates = getDatesInRange(d1, d2)

var cmorphLayer, imergLayer;

var dateValueCMORPH = document.getElementById("date_value_cmorph");
dateValueCMORPH.innerHTML = dates[0];
var sliderRangeCMORPH = document.getElementById("dateRangeCMORPH");
sliderRangeCMORPH.max = dates.length - 1;
sliderRangeCMORPH.value = 0;
var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
    layers: 'cmorph:'+cmorph_lyr,
    format: 'image/png',
    transparent: true,
    styles: 'virtual_rain_style',
}).addTo(map);

// Update the slider range value by time
sliderRangeCMORPH.oninput = function(){
    dateValueCMORPH.innerHTML = dates[this.value];
    var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[this.value];
    cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'cmorph:'+lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
};

var i = 0;
var timer;
function play_cmorph(){
    timer = setTimeout(run, 3000);
    function run(){ 
        var dateValueCMORPH = document.getElementById("date_value_cmorph");
        dateValueCMORPH.innerHTML = dates[i];
        var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[i];
        cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'cmorph:'+cmorph_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        var sliderRangeCMORPH = document.getElementById("dateRangeCMORPH");
        sliderRangeCMORPH.max = dates.length - 1;
        sliderRangeCMORPH.value = i; 
        i++
        // play();
        if (i < 5){
            play_cmorph();
        } else {
            i=0
        }
    }
}
var start_cmorph = document.getElementById("playCMORPH");
start_cmorph.addEventListener("click", play_cmorph);

var stop_cmorph = document.getElementById("pauseCMORPH");
stop_cmorph.addEventListener("click", pause_cmorph);

var res_cmorph = document.getElementById("resetCMORPH");
res_cmorph.addEventListener("click", reset_cmorph);

function pause_cmorph() {
    clearTimeout(timer);
}
function reset_cmorph(){
    clearTimeout(timer);
    i=0
    var dateValue = document.getElementById("date_value_cmorph");
    dateValue.innerHTML = dates[0];
    var sliderRangeCMORPH = document.getElementById("dateRangeCMORPH");
    sliderRangeCMORPH.value = i;
    var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
    cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'cmorph:'+cmorph_lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
}

$('input[type=radio][name=precipOptions]').change(function() {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });  
    map.addLayer(basemap_layer);
    var precip_type = this.value;
    if (precip_type == 'cmorph') {
        $('#cmorphSlider').show();
        $('#imergSlider').hide();
        var dateValueCMORPH = document.getElementById("date_value_cmorph");
        dateValueCMORPH.innerHTML = dates[0];
        var sliderRangeCMORPH = document.getElementById("dateRangeCMORPH");
        sliderRangeCMORPH.max = dates.length - 1;
        sliderRangeCMORPH.value = 0;
        var cmorph_lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
        cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'cmorph:'+cmorph_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        
        // Update the slider range value by time
        sliderRangeCMORPH.oninput = function(){
            if (map.hasLayer(cmorphLayer)){
                map.removeLayer(cmorphLayer)
            }
            if (map.hasLayer(imergLayer)){
                map.removeLayer(imergLayer)
            }
            dateValueCMORPH.innerHTML = dates[this.value];
            var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[this.value];
            cmorphLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: 'cmorph:'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            }).addTo(map);
        };
    }
    else if (precip_type == 'imerg') {
        $('#imergSlider').show();
        $('#cmorphSlider').hide();
        var dateValueIMERG = document.getElementById("date_value_imerg");
        dateValueIMERG.innerHTML = dates[0];

        var sliderRangeIMERG = document.getElementById("dateRangeIMERG");
        sliderRangeIMERG.max = dates.length - 1;
        sliderRangeIMERG.value = 0

        var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
        imergLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'imerg:'+imerg_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        
        // Update the slider range value by time
        sliderRangeIMERG.oninput = function(){
            if (map.hasLayer(cmorphLayer)){
                map.removeLayer(cmorphLayer)
            }
            if (map.hasLayer(imergLayer)){
                map.removeLayer(imergLayer)
            }
            dateValueIMERG.innerHTML = dates[this.value];
            var lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
            imergLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: 'imerg:'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            }).addTo(map);
        };
    }
});


function play_imerg(){
    timer = setTimeout(run, 3000);
    function run(){ 
        var dateValueIMERG = document.getElementById("date_value_imerg");
        dateValueIMERG.innerHTML = dates[i];
        var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[i] + '-S000000-E235959.V05';
        imergLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'imerg:'+imerg_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        var sliderRangeIMERG = document.getElementById("dateRangeIMERG");
        sliderRangeIMERG.max = dates.length - 1;
        sliderRangeIMERG.value = i; 
        i++
        // play();
        if (i < 5){
            play_imerg();
        } else {
            i=0
        }
    }
}
var start_imerg = document.getElementById("playIMERG");
start_imerg.addEventListener("click", play_imerg);

var stop_imerg = document.getElementById("pauseIMERG");
stop_imerg.addEventListener("click", pause_imerg);

var res_imerg = document.getElementById("resetIMERG");
res_imerg.addEventListener("click", reset_imerg);

function pause_imerg() {
    clearTimeout(timer);
}
function reset_imerg(){
    clearTimeout(timer);
    i=0
    var dateValue = document.getElementById("date_value_imerg");
    dateValue.innerHTML = dates[0];
    var sliderRangeIMERG = document.getElementById("dateRangeIMERG");
    sliderRangeIMERG.value = i;
    var imerg_lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
    imergLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'imerg:'+imerg_lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
}

// // Update map based on selection of precipitation types
// var precipBtn = document.getElementById("precipType");
// precipBtn.onclick = function(){
//     var precip_type = document.querySelector('input[name=precipOptions]:checked').value;
//     console.log(precip_type)
//     if (precip_type == 'chirps'){
//         var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
//         // console.log(lyr)
//         var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//             layers: precip_type+':'+lyr,
//             format: 'image/png',
//             transparent: true,
//             styles: 'virtual_rain_style',
//         });
//         var sliderRange = document.getElementById("dateRange");
//         sliderRange.max = dates_chirps.length - 1;
//         sliderRange.oninput = function(){
//             dateValue.innerHTML = dates_chirps[this.value];
//             var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[this.value];
//             var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                 layers: precip_type+':'+lyr,
//                 format: 'image/png',
//                 transparent: true,
//                 styles: 'virtual_rain_style',
//             }).addTo(map);
//         };
//         var i = 0;
//         var timer;
//         function play(){
//             map.addLayer(wmsLayer);
//             timer = setTimeout(run, 3000);
//             function run(){ 
//                 if (map.haslayer == "wmsLayer"){
//                     map.removeLayer(wmsLayer)
//                 }
//                 dateValue.innerHTML = dates_chirps[i];
//                 var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[i];
//                 var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                     layers: precip_type+':'+lyr,
//                     format: 'image/png',
//                     transparent: true,
//                     styles: 'virtual_rain_style',
//                 }).addTo(map);
    
//                 sliderRange.value = i; 
//                 i++
//                 // play();
//                 if (i < 5){
//                     play();
//                 } else {
//                     i=0
//                 }
//             }
//         }
//         var start = document.getElementById("play");
//         start.addEventListener("click", play);

//         var stopBtn = document.getElementById("pause");
//         stopBtn.addEventListener("click", pause);

//         var resetBtn = document.getElementById("reset");
//         resetBtn.addEventListener("click", reset);

//         function pause() {
//             clearTimeout(timer);
//         }
//         function reset(){
//             clearTimeout(timer);
//             i=0
//             var dateValue = document.getElementById("date_value");
//             dateValue.innerHTML = dates_chirps[0];
//             sliderRange.value = i;
//             var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
//             var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                 layers: precip_type+':'+lyr,
//                 format: 'image/png',
//                 transparent: true,
//                 styles: 'virtual_rain_style',
//             }).addTo(map);
//         }
//     }
//     else if (precip_type == 'cmorph'){

//         var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
//         var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//             layers: 'cmorph:'+lyr,
//             format: 'image/png',
//             transparent: true,
//             styles: 'virtual_rain_style',
//         });

//         var sliderRange = document.getElementById("dateRange");
//             sliderRange.max = dates.length - 1;
//             // Update the slider range value by time
//             sliderRange.oninput = function(){
//                 dateValue.innerHTML = dates[this.value];
//                 var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[this.value];
//                 var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                     layers: 'cmorph:'+lyr,
//                     format: 'image/png',
//                     transparent: true,
//                     styles: 'virtual_rain_style',
//                 }).addTo(map);
//             };

//             var i = 0;
//             var timer;

//             function play(){
//                 map.addLayer(wmsLayer);
//                 timer = setTimeout(run, 3000);
//                 function run(){ 
//                     if (map.haslayer == "wmsLayer"){
//                         map.removeLayer(wmsLayer)
//                     }
//                     dateValue.innerHTML = dates[i];
//                     var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[i];
//                     var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                         layers: 'cmorph:'+lyr,
//                         format: 'image/png',
//                         transparent: true,
//                         styles: 'virtual_rain_style',
//                     });
//                     map.addLayer(wmsLayer);

//                     sliderRange.value = i; 
//                     i++
//                     // play();
//                     if (i < 5){
//                         play();
//                     } else {
//                         i=0
//                     }
//                 }
//             }

//         var start = document.getElementById("play");
//         start.addEventListener("click", play);

//         var stopBtn = document.getElementById("pause");
//         stopBtn.addEventListener("click", pause);

//         var resetBtn = document.getElementById("reset");
//         resetBtn.addEventListener("click", reset);


//         function pause() {
//             clearTimeout(timer);
//         }

//         function reset(){
//             clearTimeout(timer);
//             i=0
//             var dateValue = document.getElementById("date_value");
//             dateValue.innerHTML = dates[0];
//             sliderRange.value = i;
//             var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
//             var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                 layers: 'cmorph:'+lyr,
//                 format: 'image/png',
//                 transparent: true,
//                 styles: 'virtual_rain_style',
//             });
//             map.addLayer(wmsLayer);
//         }
        
//     } 
//     else if (precip_type == 'imerg'){

//         var lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
//         var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//             layers: 'imerg:'+lyr,
//             format: 'image/png',
//             transparent: true,
//             styles: 'virtual_rain_style',
//         });

//         var sliderRange = document.getElementById("dateRange");
//             sliderRange.max = dates.length - 1;
//             // Update the slider range value by time
//             sliderRange.oninput = function(){
//                 dateValue.innerHTML = dates[this.value];
//                 var lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
//                 var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                     layers: 'imerg:'+lyr,
//                     format: 'image/png',
//                     transparent: true,
//                     styles: 'virtual_rain_style',
//                 }).addTo(map);
//             };

//             var i = 0;
//             var timer;

//             function play(){
//                 map.addLayer(wmsLayer);
//                 timer = setTimeout(run, 3000);
//                 function run(){ 
//                     if (map.haslayer == "wmsLayer"){
//                         map.removeLayer(wmsLayer)
//                     }
//                     dateValue.innerHTML = dates[i];
//                     var lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[i] + '-S000000-E235959.V05';
//                     var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                         layers: 'imerg:'+lyr,
//                         format: 'image/png',
//                         transparent: true,
//                         styles: 'virtual_rain_style',
//                     });
//                     map.addLayer(wmsLayer);

//                     sliderRange.value = i; 
//                     i++
//                     // play();
//                     if (i < 5){
//                         play();
//                     } else {
//                         i=0
//                     }
//                 }
//             }

//         var start = document.getElementById("play");
//         start.addEventListener("click", play);

//         var stopBtn = document.getElementById("pause");
//         stopBtn.addEventListener("click", pause);

//         var resetBtn = document.getElementById("reset");
//         resetBtn.addEventListener("click", reset);


//         function pause() {
//             clearTimeout(timer);
//         }

//         function reset(){
//             clearTimeout(timer);
//             i=0
//             var dateValue = document.getElementById("date_value");
//             dateValue.innerHTML = dates[0];
//             sliderRange.value = i;
//             var lyr = 'MK_3B-DAY-E.MS.MRG.3IMERG.' + dates[0] + '-S000000-E235959.V05';
//             var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
//                 layers: 'imerg:'+lyr,
//                 format: 'image/png',
//                 transparent: true,
//                 styles: 'virtual_rain_style',
//             });
//             map.addLayer(wmsLayer);
//         }
        
//     } 
// }