
function searchCity () {

    var city = $("#city-input")[0].value.trim();

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c97f1cd354b9dea64133acfd0f866f22&units=imperial';
    fetch(requestUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            //Add city to list
                $("#searched-cities").append('<li type="button" id="individual-city" class="btn bg-secondary mt-2 form-control">' + city);
            //Show current city
                $("#current-city")[0].textContent = city + " (" + dayjs().format('M/D/YYYY') + ")"
            //Set local storage with the latitude and longitude
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                var latAndLon = lat.toString() + " , " + lon.toString();

                localStorage.setItem(city, latAndLon)

            //Show future weather
                var futureAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";
                fetch(futureAPI)
                    .then(function (futureResponse) {
                    futureResponse.json().then(function (futureData) {
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

   $("#current-weather-icon")[0].src = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
   $("#current-temp")[0].textContent = "Temperature: " + data.current.temp + " °F";
   $("#current-wind")[0].textContent = "Wind: " + data.current.wind_speed + " mph";
   $("#current-humidity")[0].textContent = "Humidity: " + data.current.humidity + " %";

   showFiveDay(data);
}

function showFiveDay (data) {
   
    for (var i = 0; i < 5; i++) {

        var currentDate = "#date-" + i;
        $(currentDate)[0].textContent = convertDate(data, i);
        var currentImg= "#weather-icon-" + i;
        $(currentImg)[0].src = "http://openweathermap.org/img/w/" + data.daily[i+1].weather[0].icon + ".png";
        var currentTemp= "#temp-" + i;
        $(currentTemp)[0].textContent = "Temp " + data.daily[i+1].temp.day + " °F";
        var currentWind= "#wind-" + i;
        $(currentWind)[0].textContent = "Wind: " + data.daily[i+1].wind_speed + " mph";
        var currentHumidity = "#humidity-" + i;
        $(currentHumidity)[0].textContent = "Humidity: " + data.daily[i+1].humidity+ "%";
    }


}

function convertDate (data, i) {
    var newDate = new Date(data.daily[i+1].dt *1000)

    return (newDate.toLocaleDateString("en-US"))
}


// var searchedCityButton = function() {
   

// }


$("#search-button").click(function(event){
    event.preventDefault();
    searchCity();
})

$("#searched-cities").on("click", "#individual-city", function () {

    console.log("working")

})
