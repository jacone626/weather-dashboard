var apiKey = "c97f1cd354b9dea64133acfd0f866f22";
var city = $("#city-input").val();
var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

// var requestUrl = 'https://api.github.com/repos/twitter/chill/issues?per_page=5';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    }
  );

  
  $("#search-button").click(function(event){
    event.preventDefault();

    var city = $("#city-input").val();

    console.log("city name:", city);
  })



$(function(){

    
});
