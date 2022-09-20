document.querySelector("#precipForecastBtn").style.display = 'block';
document.querySelector("#precipHistBtn").style.display = 'none';
document.querySelector("#precipNRTBtn").style.display = 'none';
var precip_data = document.getElementById("precipData");
precip_data.onclick = function(){
    var precip_data_type = document.querySelector('input[name=precip]:checked').value;
    console.log(precip_data_type)
    if (precip_data_type == 'precipForecast'){
        document.querySelector("#precipForecastBtn").style.display = 'block';
        document.querySelector("#precipHistBtn").style.display = 'none';
        document.querySelector("#precipNRTBtn").style.display = 'none';
    }
    if (precip_data_type == 'precipHist'){
        document.querySelector("#precipForecastBtn").style.display = 'none';
        document.querySelector("#precipHistBtn").style.display = 'block';
        document.querySelector("#precipNRTBtn").style.display = 'none';
    }
    if (precip_data_type == 'precipNRT'){
        document.querySelector("#precipForecastBtn").style.display = 'none';
        document.querySelector("#precipHistBtn").style.display = 'none';
        document.querySelector("#precipNRTBtn").style.display = 'block';
    }
}