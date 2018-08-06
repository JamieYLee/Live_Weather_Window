// calling header.html
$.get('../../components/header.html', function(response) {
  $("#nav").html(response);
});

// getting datas of location and its temperature, forecast, humidity and air quality through apis
var country = sessionStorage.getItem("country");
var state = sessionStorage.getItem("state");
var city = sessionStorage.getItem("city");

console.log(sessionStorage.country);
console.log(sessionStorage.state);
console.log(sessionStorage.city);

$("#country").html(country);
$("#state").html(state);
$("#city").html(city);

var url1 = 'http://api.openweathermap.org/data/2.5/weather';
var data = {
  q: city,
  APPID: '2899318099685a1995a99a5538d3c3ae'
}

function convertDeg(degree){
  return (degree - 273).toFixed(1);
}

function showWeather(response){
  $("#high").html(convertDeg(response.main.temp) + "&deg");
  $("#forecast").html(response.weather[0].main);
  $("#humidity").html(response.main.humidity + "%");
}

function showQuality(response){
  $("#aqius").html(response.data.current.pollution.aqius);
}

// the function of changing footage background depending on the current weather
function changeBackground() {
  var video = $("video source");

  if($("forecast") === "Mist" || $("forecast") === "Haze"){
    video.attr('src', '../media/footages/mist_fog.mov');
    $("video")[0].load();
  }else if($("#forecast") === "Clear"){
    video.attr('src', '../media/footages/clear.mov');
    $("video")[0].load();
  }else if($("#forecast") === "Clouds"){
    video.attr('src', '../media/footages/cloudy.mov');
    $("video")[0].load();
  }
}

changeBackground();
// end of the bg change function

$.get(url1, data, showWeather);


$.get(`http://api.airvisual.com/v2/city?city=${sessionStorage.city}&state=${sessionStorage.state}&country=${sessionStorage.country}&key=7b4WtyJN5Tsgs3xLY`, showQuality);
