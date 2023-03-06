
var searchCity = function() {

    var city = $("#city-input")[0].value.trim();

    console.log("city name:", city);

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c97f1cd354b9dea64133acfd0f866f22&units=imperial';
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
            //Show current city
            $("#current-city")[0].textContent = city + " (" + dayjs().format('MM/D/YYYY') + ")"
            //Show future weather
            var futureAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";
            fetch(futureAPI)
                .then(function (futureResponse) {
                futureResponse.json().then(function (futureData) {
                console.log(futureData);
                currentWeather(futureData);
                })
            })
            });
        } else {
            alert("City not found")
        }
  })
}

function currentWeather (data) {

   $("#current-weather-icon")[0].src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
   $("#current-temp")[0].textContent = "Temperature: " + data.main.temp + " °F"
   $("#current-wind")[0].textContent = "Wind: " + data.wind.speed + " mph"
   $("#current-humidity")[0].textContent = "Humidity: " + data.main.humidity + " %"
}

function showFiveDay (data) {
    document.getElementById("temp-1").textContent = "Temperature: " + data.daily[1].temp.day + " °F"
    for (var i=1; i<6; i++) {
        var weatherData = {
            date: "not sure yet",
            icon: "http://openweathermap.org/img/w/" + data.daily[i++].weather[0].icon + ".png",
            temp: data.daily[i++].temp.day,
            wind: data.daily[i++].wind_speed,
            humidity: data.daily[i++].humidity
        }
        var currentDate = "#date-" + i;
        $(currentDate)[1].textContent = weatherData.date;
        currentImg= "#img-" + i;
        $(currentImg)[1].src = weatherData.icon;
        currentTemp= "#temp-" + i;
        $(currentTemp)[1].textContent = "Wind: " + weatherData.temp + " mph"
        currentWind= "#wind-" + i;
        $(currentWind)[1].textContent = "Temp: " + weatherData.temp + " °F"
        currentHumidity = "#humidity-" + i;
        $(currentHumidity)[1].textContent = "Humidity: " + weatherData.humidity + "%";
    }


}

var searchedCityButton = function() {
   

}


$("#search-button").click(function(event){
    event.preventDefault();
    searchCity();
})

$("#searched-cities").click(function() {


})



