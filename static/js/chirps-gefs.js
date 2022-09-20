var play = document.querySelector("#pauseCHIRPS");


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
const priorDate = td.setDate(td.getDate() + 0)
// const nd = new Date(priorDate).toISOString().split('T')[0].replace("-", "").replace("-", "");

const td2 = new Date();
const endDate = td2.setDate(td2.getDate() + 5)

const d1 =  new Date(priorDate);
const d2 = new Date(endDate); //"2022-08-15"

const dates_chirps = getDatesInRangeCHIRPS(d1, d2)

// var selected_date = dates_chirps[2]
// console.log(dates_chirps)

var dateValueCHIRPS = document.getElementById("date_value_chirps");
dateValueCHIRPS.innerHTML = dates_chirps[2];

var chirpsLayer;
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
        if (i < 4){
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