/* 
    ** Map  Scripts **
*/

// Queryselector
var sidebarContent = document.querySelector('#sidebar-content');
// var displayHomeSidebarContent = document.querySelector("#home" );
var displayFilterSidebarContent = document.querySelector("#filter" );
var displayLayerSidebarContent = document.querySelector("#layer" );
var displayBasemapSidebarContent = document.querySelector("#basemap" );
// var closeHomeSidebarContent = document.querySelector("#close-home-content" );
var closeFilterSidebarContent = document.querySelector("#close-filter-content" );
var closeLayerSidebarContent = document.querySelector("#close-layer-content" );
var closeBasemapSidebarContent = document.querySelector("#close-basemap-content" );

// Define map center
var MapOtions = {
    center: [15.5162, 102.9560],
    // center: [-42.0409, 146.8087],
    zoom: 4,
    // minZoom: 5,
    // maxZoom: 14,
    zoomControl: false
}

//create map
var map = L.map('map', MapOtions);

// Set default basemap
var basemap_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Change zoom control postion to right
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Add scale control to map
var scale = L.control.scale({
    position:'bottomright'
}).addTo(map);

// Onlick expand filter sidebar content area
displayFilterSidebarContent.onclick = function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    }else {
        sidebarContent.style.display = "none";
    }
};

// Onlick expand layer sidebar content area
displayLayerSidebarContent.onclick = function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else {
        sidebarContent.style.display = "none";
    }
}

// Onlick expand basemap sidebar content area
displayBasemapSidebarContent.onclick=function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else {
        sidebarContent.style.display = "none";
    }
}

// Onclick close sidebar home content area
// closeHomeSidebarContent.onclick = function(){
//     sidebarContent.style.display = "none";
// }
// Onclick close sidebar home content area
closeFilterSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}
// Onclick close sidebar layer content area
closeLayerSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}
// Onclick close sidebar basemap content area
closeBasemapSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}

/* 
    Filter Panel 
*/

/** End Layer Panel */

/* 
    Basemap Panel
*/

// Onclick switch basemap 
var basemap_list = document.querySelectorAll(".basemap-card");

for (var i = 0; i < basemap_list.length; i++) {
    basemap_list[i].onclick = function (){
        var elems = document.querySelector(".nav-basemap .active").classList.remove("active");
        
        let selected_basemap = this.getAttribute('data-layer');
        
        //console.log(selected_basemap);
        if(selected_basemap === "osm"){
            basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); 
            this.className += " active";
        }else if((selected_basemap === "street")){
            this.className += " active";
            basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}');
        }else if(selected_basemap === "satellite"){
            this.className += " active";
            basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
        }else if(selected_basemap === "terrain"){
            this.className += " active";
            basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}');
        }
        else if(selected_basemap === "topo"){
            this.className += " active";
            basemap_layer.setUrl('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
        }
        else if(selected_basemap === "dark"){
            this.className += " active";
            basemap_layer.setUrl('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
        }
        else if(selected_basemap === "gray"){
            this.className += " active";
            basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}');
        }     
    }
}

/** End Basemap Panel */

$('#chirpsSlider').show();
$('#cmorphSlider').hide();
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

function getDatesInRangeCHIRPS(startDate, endDate) {
    const date = new Date(startDate.getTime());
    // Exclude start date
    date.setDate(date.getDate() + 1);
    const dates = [];
    // Exclude end date
    while (date < endDate) {

      dates.push(new Date(date).toISOString().split('T')[0].replace("-", ".").replace("-", ""));
      date.setDate(date.getDate() + 1);
    }
    return dates;
}
  
const td = new Date(); // "2022-08-14"
const priorDate = td.setDate(td.getDate() - 5)
// const nd = new Date(priorDate).toISOString().split('T')[0].replace("-", "").replace("-", "");

const td2 = new Date();
const endDate = td2.setDate(td2.getDate() + 1)

const d1 =  new Date(priorDate);
const d2 = new Date(endDate); //"2022-08-15"

const dates = getDatesInRange(d1, d2)
const dates_chirps = getDatesInRangeCHIRPS(d1, d2)
// console.log(dates);

var dateValueCHIRPS = document.getElementById("date_value_chirps");
dateValueCHIRPS.innerHTML = dates_chirps[0];

var chirpsLayer, cmorphLayer, imergLayer;
var chirps_lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
// console.log(lyr)
chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
    layers: 'chirps:'+chirps_lyr,
    format: 'image/png',
    transparent: true,
    styles: 'virtual_rain_style',
}).addTo(map);

var sliderRangeCHIRPS = document.getElementById("dateRangeCHIRPS");
sliderRangeCHIRPS.max = dates_chirps.length - 1;
sliderRangeCHIRPS.oninput = function(){
    dateValueCHIRPS.innerHTML = dates_chirps[this.value];
    var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[this.value];
    chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'chirps:'+lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
};

var i = 0;
var timer;
function play_chirps(){
    timer = setTimeout(run, 3000);
    function run(){ 
        dateValueCHIRPS.innerHTML = dates_chirps[i];
        var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[i];
        chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'chirps:'+lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        var sliderRangeCHIRPS = document.getElementById("dateRangeCHIRPS");
        sliderRangeCHIRPS.value = i; 
        i++
        // play();
        if (i < 5){
            play_chirps();
        } else {
            i=0
        }
    }
}
var start_chirps = document.getElementById("playCHIRPS");
start_chirps.addEventListener("click", play_chirps);

var stop_chirps = document.getElementById("pauseCHIRPS");
stop_chirps.addEventListener("click", pause_chirps);

var res_chirps = document.getElementById("resetCHIRPS");
res_chirps.addEventListener("click", reset_chirps);

function pause_chirps() {
    clearTimeout(timer);
}
function reset_chirps(){
    clearTimeout(timer);
    i=0
    var dateValue = document.getElementById("date_value_chirps");
    dateValue.innerHTML = dates_chirps[0];
    var sliderRangeCHIRPS = document.getElementById("dateRangeCHIRPS");
    sliderRangeCHIRPS.value = i;
    var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
    chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'chirps:'+lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
}

$('input[type=radio][name=precipOptions]').change(function() {
    // if (map.hasLayer(chirpsLayer)){
    //     map.removeLayer(chirpsLayer)
    // }
    // if (map.hasLayer(cmorphLayer)){
    //     map.removeLayer(cmorphLayer)
    // }
    // if (map.hasLayer(imergLayer)){
    //     map.removeLayer(imergLayer)
    // }
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });  
    map.addLayer(basemap_layer);
    var precip_type = this.value;
    if (precip_type == 'chirps') {
        $('#chirpsSlider').show();
        $('#cmorphSlider').hide();
        $('#imergSlider').hide();
        dateValueCHIRPS.innerHTML = dates_chirps[0];
        var chirps_lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
        chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'chirps:'+chirps_lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
        var sliderRangeCHIRPS = document.getElementById("dateRangeCHIRPS");
        sliderRangeCHIRPS.max = dates_chirps.length - 1;
        sliderRangeCHIRPS.value = 0;
        sliderRangeCHIRPS.oninput = function(){
            if (map.hasLayer(chirpsLayer)){
                map.removeLayer(chirpsLayer)
            }
            if (map.hasLayer(cmorphLayer)){
                map.removeLayer(cmorphLayer)
            }
            if (map.hasLayer(imergLayer)){
                map.removeLayer(imergLayer)
            }
            dateValueCHIRPS.innerHTML = dates_chirps[this.value];
            var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[this.value];
            chirpsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: precip_type+':'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            }).addTo(map);
        };
    }
    else if (precip_type == 'cmorph') {
        $('#cmorphSlider').show();
        $('#chirpsSlider').hide();
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
            if (map.hasLayer(chirpsLayer)){
                map.removeLayer(chirpsLayer)
            }
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
        $('#chirpsSlider').hide();
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
            if (map.hasLayer(chirpsLayer)){
                map.removeLayer(chirpsLayer)
            }
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

// Define country boundary style
var adm0Style = {
    color: "#6A5ACD",
    weight: 1.0,
    //opacity: 0.6,
    //fillOpacity: 0.3,
    fillColor: "none",
};
var adm1Style = {
    color: "#6A5ACD",
    weight: 1.0,
    //opacity: 0.6,
    //fillOpacity: 0.3,
    fillColor: "none",
};
// Highlight feature style
var highlightStyle = {
    color: '#00008B', 
    weight: 1.0,
    opacity: 0.6,
    fillOpacity: 0.65,
    // fillColor: '#2262CC'
};

var adm0_layer = L.geoJson(adm0, {
    style: adm0Style,
    onEachFeature: function(feature, admin0Layer) {
        admin0Layer.bindTooltip(feature.properties.NAME_0);
        // admin0Layer.on('mouseover', function (e) {
        //     this.setStyle(highlightStyle);
        //     this.bindTooltip(feature.properties.NAME_0);
        // }); 
        // admin0Layer.on('mouseout', function (e) {
        //     this.setStyle(adm0Style);
        // });                   
    } 
});

var adm1_layer = L.geoJson(adm1, {
    style: adm1Style,
    onEachFeature: function(feature, admin1Layer) {
        admin1Layer.bindTooltip(feature.properties.NAME_1);
        // admin1Layer.on('mouseover', function (e) {
        //     this.setStyle(highlightStyle);
        //     this.bindTooltip(feature.properties.NAME_1);
        // }); 
        // admin1Layer.on('mouseout', function (e) {
        //     this.setStyle(adm0Style);
        // });                   
    } 
});

// document.querySelector("#adm0_toggle").onclick = function(){
//     if(this.checked) {
//         map.addLayer(adm0_layer);
//     } else {
//         map.removeLayer(adm0_layer);
//     }
// }

// document.querySelector("#adm1_toggle").onclick = function(){
//     if(this.checked) {
//         map.addLayer(adm1_layer);
//     } else {
//         map.removeLayer(adm1_layer);
//     }
// }
