

var searchCity = function() {

    var city = $("#city-input").val().trim();

    console.log("city name:", city);

    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c97f1cd354b9dea64133acfd0f866f22&units=imperial';
    fetch(requestUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            //Add city to list
            $("#searched-cities").append('<li type="button" class="btn bg-secondary mt-2 form-control">' + city);
            //Set local storage with the latitude and longitude
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var latAndLon = lat.toString() + " , " + lon.toString();

            localStorage.setItem(city, latAndLon)
            //Show current weather
            document.getElementById("current-city").textContent = city + " (" + dayjs().format('MM/D/YYYY') + ")"
            document.getElementById("current-weather-icon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
            document.getElementById("current-temp").textContent = "Temperature: " + data.main.temp + " °F"
            document.getElementById("current-wind").textContent = "Wind: " + data.wind.speed + " mph"
            document.getElementById("current-humidity").textContent = "Humidity: " + data.main.humidity + " %"
            //Show future weather
            // var futureAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=c97f1cd354b9dea64133acfd0f866f22";
            var futureAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=c97f1cd354b9dea64133acfd0f866f22"
            fetch(futureAPI)
                .then(function (response) {
                response.json().then(function (data) {
                console.log(data);
                })
            })
            });
        } else {
            alert("City not found")
        }
  })
}

function showFiveDay (data) {
    for (var i=0; i<5; i++) {
        var weatherData = {
            date: "not sure yet",
            icon: "http://openweathermap.org/img/w/" + data.daily[i++].weather[0].icon + ".png",
            temp: data.daily[i++].temp.day,
            wind: data.daily[i++].wind_speed,
            humidity: data.daily[i++].humidity
        }
    }
}

var searchedCityButton = function() {
   

}


$("#search-button").click(function(event){
    event.preventDefault();
    searchCity();
})


$(function(){

    
});

