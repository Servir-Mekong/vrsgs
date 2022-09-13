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

var dateValue = document.getElementById("date_value");

// const dateString = dates[0];
// const year = +dateString.substring(0, 4);
// const month = +dateString.substring(4, 6);
// const day = +dateString.substring(6, 8);
// const date = new Date(year, month - 1, day).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'});
// console.log(date)

dateValue.innerHTML = dates[0];

var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
// console.log(lyr)
var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
    layers: 'chirps:'+lyr,
    format: 'image/png',
    transparent: true,
    styles: 'virtual_rain_style',
});
var sliderRange = document.getElementById("dateRange");
    sliderRange.max = dates_chirps.length - 1;
    sliderRange.oninput = function(){
        dateValue.innerHTML = dates_chirps[this.value];
        var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[this.value];
        console.log(lyr)
        var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'chirps:'+lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);
    };
var i = 0;
var timer;
function play(){
    map.addLayer(wmsLayer);
    timer = setTimeout(run, 3000);
    function run(){ 
        if (map.haslayer == "wmsLayer"){
            map.removeLayer(wmsLayer)
        }
        dateValue.innerHTML = dates_chirps[i];
        var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[i];
        var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'chirps:'+lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        }).addTo(map);

        sliderRange.value = i; 
        i++
        // play();
        if (i < 5){
            play();
        } else {
            i=0
        }
    }
}
var start = document.getElementById("play");
start.addEventListener("click", play);

var stopBtn = document.getElementById("pause");
stopBtn.addEventListener("click", pause);

var resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", reset);

function pause() {
    clearTimeout(timer);
}
function reset(){
    clearTimeout(timer);
    i=0
    var dateValue = document.getElementById("date_value");
    dateValue.innerHTML = dates_chirps[0];
    sliderRange.value = i;
    var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
    var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
        layers: 'chirps:'+lyr,
        format: 'image/png',
        transparent: true,
        styles: 'virtual_rain_style',
    }).addTo(map);
}

// Update map based on selection of precipitation types
var precipBtn = document.getElementById("precipType");
precipBtn.onclick = function(){
    if (map.haslayer == "wmsLayer"){
        map.removeLayer(wmsLayer)
    }
    var precip_type = document.querySelector('input[name=precipOptions]:checked').value;
    if (precip_type == 'chirps'){
        var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
        // console.log(lyr)
        var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: precip_type+':'+lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        });
        var sliderRange = document.getElementById("dateRange");
        sliderRange.max = dates_chirps.length - 1;
        sliderRange.oninput = function(){
            dateValue.innerHTML = dates_chirps[this.value];
            var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[this.value];
            var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: precip_type+':'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            }).addTo(map);
        };
        var i = 0;
        var timer;
        function play(){
            map.addLayer(wmsLayer);
            timer = setTimeout(run, 3000);
            function run(){ 
                if (map.haslayer == "wmsLayer"){
                    map.removeLayer(wmsLayer)
                }
                dateValue.innerHTML = dates_chirps[i];
                var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[i];
                var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                    layers: precip_type+':'+lyr,
                    format: 'image/png',
                    transparent: true,
                    styles: 'virtual_rain_style',
                }).addTo(map);
    
                sliderRange.value = i; 
                i++
                // play();
                if (i < 5){
                    play();
                } else {
                    i=0
                }
            }
        }
        var start = document.getElementById("play");
        start.addEventListener("click", play);

        var stopBtn = document.getElementById("pause");
        stopBtn.addEventListener("click", pause);

        var resetBtn = document.getElementById("reset");
        resetBtn.addEventListener("click", reset);

        function pause() {
            clearTimeout(timer);
        }
        function reset(){
            clearTimeout(timer);
            i=0
            var dateValue = document.getElementById("date_value");
            dateValue.innerHTML = dates_chirps[0];
            sliderRange.value = i;
            var lyr = 'mb_cgefs_precip_0p05_'+ dates_chirps[0];
            var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: precip_type+':'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            }).addTo(map);
        }
    }
    else if (precip_type == 'cmorph'){

        var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
        var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
            layers: 'cmorph:'+lyr,
            format: 'image/png',
            transparent: true,
            styles: 'virtual_rain_style',
        });

        var sliderRange = document.getElementById("dateRange");
            sliderRange.max = dates.length - 1;
            // Update the slider range value by time
            sliderRange.oninput = function(){
                dateValue.innerHTML = dates[this.value];
                var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[this.value];
                var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                    layers: 'cmorph:'+lyr,
                    format: 'image/png',
                    transparent: true,
                    styles: 'virtual_rain_style',
                }).addTo(map);
            };

            var i = 0;
            var timer;

            function play(){
                map.addLayer(wmsLayer);
                timer = setTimeout(run, 3000);
                function run(){ 
                    if (map.haslayer == "wmsLayer"){
                        map.removeLayer(wmsLayer)
                    }
                    dateValue.innerHTML = dates[i];
                    var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[i];
                    var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                        layers: 'cmorph:'+lyr,
                        format: 'image/png',
                        transparent: true,
                        styles: 'virtual_rain_style',
                    });
                    map.addLayer(wmsLayer);

                    sliderRange.value = i; 
                    i++
                    // play();
                    if (i < 5){
                        play();
                    } else {
                        i=0
                    }
                }
            }

        var start = document.getElementById("play");
        start.addEventListener("click", play);

        var stopBtn = document.getElementById("pause");
        stopBtn.addEventListener("click", pause);

        var resetBtn = document.getElementById("reset");
        resetBtn.addEventListener("click", reset);


        function pause() {
            clearTimeout(timer);
        }

        function reset(){
            clearTimeout(timer);
            i=0
            var dateValue = document.getElementById("date_value");
            dateValue.innerHTML = dates[0];
            sliderRange.value = i;
            var lyr = 'MK_CMORPH_V0.x_RAW_0.25deg-DLY_00Z_'+ dates[0];
            var wmsLayer = L.tileLayer.wms('https://geoserver.adpc.net/geoserver/wms?', {
                layers: 'cmorph:'+lyr,
                format: 'image/png',
                transparent: true,
                styles: 'virtual_rain_style',
            });
            map.addLayer(wmsLayer);
        }
        
    } 
}

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
