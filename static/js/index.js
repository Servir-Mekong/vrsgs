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
    minZoom: 4,
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

// Define country boundary style
var adm0Style = {
    color: "red", // #fff
    weight: 1,
    fillOpacity: 0.0,
    fillColor: '#ffc107'
};
var adm1Style = {
    color: "red", // #eee
    weight: 0.6,
    fillOpacity: 0.0,
    fillColor: '#ffc107'
};

var adm2Style = {
    color: "red", // #FFDEAD
    weight: 0.5,
    fillOpacity: 0.0,
    fillColor: "#ffc107",
    cursor: 'pointer'
};
// highlight admin feature style
var highlightStyle = {
    color: 'black', // #FFA500
    weight: 2.5,
    fillOpacity: 0.0,
    fillColor: '#ffc107' 
};
var adm0_layer = L.geoJson(adm0, {
    style: adm0Style,
    onEachFeature: function(feature, admin0Layer) {
        admin0Layer.bindTooltip(feature.properties.NAME_0);                
    } 
});

var adm1_layer = L.geoJson(adm1, {
    style: adm1Style,
    onEachFeature: function(feature, admin1Layer) {
        admin1Layer.bindTooltip(feature.properties.NAME_1);                 
    } 
});
var adm2_layer = L.geoJson(adm2, {
    style: adm2Style,
    onEachFeature: function(feature, adm2Layer){

        // Display a popup with the name of the county.
        var district = feature.properties.NAME_2;
        var province = feature.properties.NAME_1;
        var country = feature.properties.NAME_0;
        var f_0_15 = feature.properties.F_0_15;
        var f_15_65 = feature.properties.F_15_65;
        var f_above_65 = feature.properties.F__65;
        var f_total = f_0_15 + f_15_65 + f_above_65;
        var m_0_15 = feature.properties.M_0_15;
        var m_15_65 = feature.properties.M_15_65;
        var m_above_65 = feature.properties.M__65;    
        var m_total = m_0_15+m_15_65+m_above_65;
        var hospitals = feature.properties.Hospitals;
        var primary = feature.properties.Primary;
        var secondary = feature.properties.Secondary;
        var trunks = feature.properties.Trunks;

        adm2Layer.on('mouseover', function (e) {
            this.setStyle(highlightStyle);
            this.bindPopup( 
                '<h4 style="margin-top: 20px; font-weight: bold; margin-bottom: 0px;">'+district+': '+province+', '+country+'</h4>'+
                '<div class="table-responsive adm2-popup-table">'+
                    '<table class="table">'+
                        '<thead>'+
                            '<tr>'+
                                '<th>'+"Population"+'</th>'+
                                '<th>'+"Female"+'</th>'+
                                '<th>'+"Male"+'</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>' +
                            '<tr>'+
                                '<td>'+"Age 0-15"+'</td>'+
                                '<td>'+f_0_15+'</td>'+
                                '<td>'+m_0_15+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+"Age 15-65"+'</td>'+
                                '<td>'+f_15_65+'</td>'+
                                '<td>'+m_15_65+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+"Age >65"+'</td>'+
                                '<td>'+f_above_65+'</td>'+
                                '<td>'+m_above_65+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+"Total"+'</td>'+
                                '<td>'+f_total+'</td>'+
                                '<td>'+m_total+'</td>'+
                            '</tr>'+
                        '</tbody>'+
                        '<thead>'+
                            '<tr>'+
                                '<th>'+"Health Facilities"+'</th>'+
                                '<th>'+"No."+'</th>'+
                                '<th>'+""+'</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td>'+ "Hospitals" +'</td>'+
                                '<td>'+ hospitals +'</td>'+
                                '<td>'+""+'</td>'+
                            '</tr>'+
                        '</tbody>'+
                        '<thead>'+
                            '<tr>'+
                                '<th>'+"Roads"+'</th>'+
                                '<th>'+"No."+'</th>'+
                                '<th>'+""+'</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td>'+ "Primary" +'</td>'+
                                '<td>'+ primary +'</td>'+
                                '<td>'+""+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+ "Secondary" +'</td>'+
                                '<td>'+ secondary +'</td>'+
                                '<td>'+""+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+ "Trunks" +'</td>'+
                                '<td>'+ trunks +'</td>'+
                                '<td>'+""+'</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'
            );
            // this.bindTooltip(feature.properties.NAME_2);
        }); 
        adm2Layer.on('mouseout', function (e) {
            this.setStyle(adm2Style);
        }); 
        adm2Layer.on('click', function(e){
            map.fitBounds(e.target.getBounds());
            // animate: true;
        });        
    }
});
$('input[type=checkbox][name=adm0_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(adm0_layer);
    } else {
        map.removeLayer(adm0_layer);
    }
});
$('input[type=checkbox][name=adm1_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(adm1_layer);
    } else {
        map.removeLayer(adm1_layer);
    }
});
$('input[type=checkbox][name=adm2_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(adm2_layer);
    } else {
        map.removeLayer(adm2_layer);
    }
});

map.on('mouseover zoomend', function() {
    if(map.getZoom() >= 7 ) {
        map.removeLayer(adm0_layer);
        $("#adm0_toggle").prop("checked", false);
    } else {
        map.addLayer(adm0_layer);
        $("#adm0_toggle").prop("checked", true);
    }
});
map.on('mouseover zoomend', function() {
    if(map.getZoom() <= 6) {
        map.removeLayer(adm1_layer);
        $("#adm1_toggle").prop("checked", false);
    } else {
        map.addLayer(adm1_layer);
        $("#adm1_toggle").prop("checked", true);
    }
});
map.on('mouseover zoomend', function() {
    if(map.getZoom() >= 8) {
        map.removeLayer(adm1_layer);
        $("#adm1_toggle").prop("checked", false);
    }
});
map.on('mouseover zoomend', function() {
    if(map.getZoom() < 8) {
        map.removeLayer(adm2_layer);
        $("#adm2_toggle").prop("checked", false);
    } else {
        map.addLayer(adm2_layer);
        $("#adm2_toggle").prop("checked", true);
    }
});