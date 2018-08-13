// calling header.html
$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});

function showCountry(response){
  var row = '';
  row += '<option value="" disabled selected hidden>Country...?</option>'

  if(response.data.length == null){
    var country = response.data.country;

    row += `<option id="${country}0" value="${country}">${country}</option>`;
    $("#countries").html(row);

    $(`#${country}0`).attr("selected", "selected");
  }else{
    for(var i=0; i<response.data.length; i++){
      var country = response.data[i].country;

      row += `<option id="${country}0" value="${country}">${country}</option>`;
      $("#countries").html(row);
    }
  }
}

$( "#countries" ).change(function() {
  let country = $("select#countries option:checked").val();
  sessionStorage.setItem("country", `${country}`);

  $.get(`http://api.airvisual.com/v2/states?country=${sessionStorage.country}&key=7b4WtyJN5Tsgs3xLY`, showState);
});

function showState(response){
  var row = '';
  row += '<option value="" disabled selected>State...?</option>';

  if(response.data.length == null){
    var state = response.data.state;

    row += `<option id="${state}0" value="${state}">${state}</option>`;
    $("#states").html(row);

    $(`#${state}0`).attr("selected", "selected");
  }else{
    for(var i=0; i<response.data.length; i++){
      var state = response.data[i].state;

      row += `<option id="${state}0" value="${state}">${state}</option>`;
      $("#states").html(row);
    }
  }
}

$( "#states" ).change(function() {
  let state = $("select#states option:checked").val();
  sessionStorage.setItem("state", `${state}`);

  $.get(`http://api.airvisual.com/v2/cities?state=${sessionStorage.state}&country=${sessionStorage.country}&key=7b4WtyJN5Tsgs3xLY`, showCity);
});

function showCity(response){
  var row = '';
  row += '<option value="" disabled selected>City...?</option>';

  if(response.data.length == null){
    var city = response.data.city;

    row += `<option id="${city}0" value="${city}">${city}</option>`;
    $("#cities").html(row);

    $(`#${city}0`).attr("selected", "selected");
  }else{
    for(var i=0; i<response.data.length; i++){
      var city = response.data[i].city;

      row += `<option id="${city}0" value="${city}">${city}</option>`;
      $("#cities").html(row);
    }
  }
}

$( "#cities" ).change(function() {
  let city = $("select#cities option:checked").val();
  sessionStorage.setItem("city", `${city}`);
});


function showNearest(){
  function getNearest(response){
    var nearest_country = response.data.country;
    var nearest_state = response.data.state;
    var nearest_city = response.data.city;

    sessionStorage.setItem("country", `${nearest_country}`);
    sessionStorage.setItem("state", `${nearest_state}`);
    sessionStorage.setItem("city", `${nearest_city}`);

    showCountry(response);
    showState(response);
    showCity(response);
  }
  $.get('http://api.airvisual.com/v2/nearest_city?key=7b4WtyJN5Tsgs3xLY', getNearest);
}

function Reset(){
  document.getElementById("countries").options.length = 0;
  document.getElementById("states").options.length = 0;
  document.getElementById("cities").options.length = 0;
  function goReset(response){
    showCountry(response);
    showState(response);
    showCity(response);
  }
  $.get('http://api.airvisual.com/v2/countries?key=7b4WtyJN5Tsgs3xLY', goReset);
}

$.get('http://api.airvisual.com/v2/countries?key=7b4WtyJN5Tsgs3xLY', showCountry);
