
var searchCity = function() {
    $("#search-button").click(function(event){
    event.preventDefault();

    var city = $("#city-input").val();

    console.log("city name:", city);

    var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c97f1cd354b9dea64133acfd0f866f22';
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        console.log(data);
    });
  })
}

searchCity();


$(function(){

    
});
