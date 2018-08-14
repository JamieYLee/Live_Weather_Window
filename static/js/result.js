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
$("#state").html(state + ",");
$("#city").html(city);

var url1 = 'http://api.openweathermap.org/data/2.5/weather';
var data = {
  q: city,
  APPID: '2899318099685a1995a99a5538d3c3ae'
}

function convertDeg(degree){
  return (degree - 273).toFixed(0);
}

function showWeather(response){
  $("#high").html(convertDeg(response.main.temp) + "&deg");
  $("#forecast").html(response.weather[0].main);
  $("#humidity").html(response.main.humidity + "%");
}

function showQuality(response){
  $("#aqius").html(response.data.current.pollution.aqius);
  changeBackground();
  changeAQIcolor();
  changeImg();
  changeText();
}

// the function of changing footage background depending on the current weather
function changeBackground() {
  var video = $("video source");

  if($("#aqius").text() < 100 || $("#aqius").text() === "-"){
    if($("#forecast").text() === "Mist" || $("#forecast").text() === "Haze" || $("#forecast").text() === "Fog"){
      video.attr('src', './static/media/footages/mist_fog.mov');
    }else if($("#forecast").text() === "Clear"){
      video.attr('src', './static/media/footages/clear.mov');
    }else if($("#forecast").text() === "Clouds"){
      video.attr('src', './static/media/footages/cloudy.mp4');
    }else if($("#forecast").text() === "Rain"){
      video.attr('src', './static/media/footages/rain.mov');
    }else if($("#forecast").text() === "Thunderstorm"){
      video.attr('src', './static/media/footages/lightning.mp4');
    }else if($("#forecast").text() === "Snow"){
      video.attr('src', './static/media/footages/snow.mp4');
    }else if($("#forecast").text() === "Dust"){
      video.attr('src', './static/media/footages/dust.mp4');
    }
  }else{
    video.attr('src','./static/media/footages/bad_air_quality.mov');
  }
  $("video")[0].load();
}

function changeAQIcolor(){
  var aqi = $("#aqius").text();

  if(aqi >= 0 && aqi < 50){
    $("#aqius").css('color', 'rgb(49, 210, 49)');
  }else if(aqi >= 50 && aqi < 100){
    $("#aqius").css('color', '#ffd11a');
  }else if(aqi >= 100 && aqi < 150){
    $("#aqius").css('color', '#ff9900');
  }else if(aqi >= 150 && aqi < 200){
    $("#aqius").css('color', '#ff4d4d');
  }else if(aqi >= 200 && aqi < 300){
    $("#aqius").css('color', '#ff00ff');
  }else if(aqi >= 300){
    $("#aqius").css('color', '#5e0000');
  }
}

function changeImg(){
  if($("#forecast").text() === "Thunderstorm"){
    $("#weahter_img").attr('src', './static/media/img/storm.png');
  }else if($("#forecast").text() === "Clouds"){
    $("#weahter_img").attr('src', './static/media/img/clouds.png');
  }else if($("#forecast").text() === "Rain"){
    $("#weahter_img").attr('src', './static/media/img/rain.png');
  }else if($("#forecast").text() === "Clear"){
    $("#weahter_img").attr('src', './static/media/img/clear.png');
  }else if($("#forecast").text() === "Snow"){
    $("#weahter_img").attr('src', './static/media/img/snow.png');
  }else if($("#forecast").text() === "Fog" || $("#forecast").text() === "Haze" || $("#forecast").text() === "Dust" || $("#forecast").text() === "Mist"){
    $("#weahter_img").attr('src', './static/media/img/fog.png');
  }
}

function changeText(){
  var humidity_index = $("#humidity").text();
  var weather_text = $("#forecast_alert");

  if($("#forecast").text() === "Thunderstorm"){
    weather_text.html("Lightning rods will make you safe but anyway becareful while outside!");
  }else if($("#forecast").text() === "Clouds"){
    weather_text.html("Worried about snow or rain? But still outdoor activity available!");
  }else if($("#forecast").text() === "Rain"){
    weather_text.html("Close your eyes and raining sounds will make you calm.");
  }else if($("#forecast").text() === "Clear"){
    weather_text.html("So pleasant! Enjoy lots of outdoor activities, and dont' forget the sunscreen!");
  }else if($("#forecast").text() === "Snow"){
    weather_text.html("Watching snowfalls through window + Hot Chocolate = Perfect");
  }else if($("#forecast").text() === "Fog" || $("#forecast").text() === "Haze"|| $("#forecast").text() === "Mist"){
    weather_text.html("Really be careful when you are driving.");
  }else if($("#forecast").text() === "Dust"){
    weather_text.html("Uh-oh.... Do not go outside as much as possible for your health.");
  }

  if(parseInt(humidity_index) >= 40){
    $("#humidity_alert").css("display", "block");
  }

  if($("#aqius").text() >= 100){
    $("#aq_alert").css("display", "block");
    $("#warn_img").css("display", "block");
  }
}

// changing cel to far, far to cel
$("#myCFswitch").change(function(){
  var celChange = $("#high").text();
  // checked -> default
  if(this.checked){
    // celsius default, farenheit to celsiusc
    var celcius = (parseInt(celChange)-32) * 5/9;
    $("#high").html(celcius.toFixed(0).toString() + "&deg");
  }else{
    // ceisius to farenheit
    var farenheit = parseInt(celChange) * 9/5 + 32;
    $("#high").html(farenheit.toFixed(0).toString() + "&deg");
  }
});

// about bookmarks
function setCookie(){
  document.cookie = "city=" + $("#city").text();
  document.cookie = "state=" + $("#state").text();
  document.cookie = "country=" + $("#country").text();

  console.log(document.cookie);
}

$.get(url1, data, showWeather);

$.get(`http://api.airvisual.com/v2/city?city=${sessionStorage.city}&state=${sessionStorage.state}&country=${sessionStorage.country}&key=7b4WtyJN5Tsgs3xLY`, showQuality);
