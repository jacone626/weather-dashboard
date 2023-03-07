//Searches the city and pulls the API key
function searchCity () {

    var city = $("#city-input")[0].value.trim();

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2bdcf4a80dd9deb5726ef62daec520a9&units=imperial';
    fetch(requestUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            //Add city to list
                $("#searched-cities").append('<li type="button" id="individual-city" class="btn bg-secondary mt-2 form-control">' + city);
            //Added current city to this function to avoid issues when clicking on searched cities
            $("#current-city")[0].textContent = city + " (" + dayjs().format('M/D/YYYY') + ")"
            //Set local storage with the latitude and longitude
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                var latAndLon = lat.toString() + " , " + lon.toString();

                localStorage.setItem(city, latAndLon)

            //Show future weather
                var futureAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=b262298fbe39ad30d243f31f6e1297bc";
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

//Displays the current weather at the top
function currentWeather (data) {

 $("#city-info").removeClass("hidden")

   $("#current-weather-icon")[0].src = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
   $("#current-temp")[0].textContent = "Temp: " + data.current.temp + " °F";
   $("#current-wind")[0].textContent = "Wind: " + data.current.wind_speed + " mph";
   $("#current-humidity")[0].textContent = "Humidity: " + data.current.humidity + " %";

   showFiveDay(data);
}

//Runs the five day weather forecast
function showFiveDay (data) {
   
    for (var i = 0; i < 5; i++) {

        var currentDate = "#date-" + i;
        $(currentDate)[0].textContent = convertDate(data, i);
        var currentImg= "#weather-icon-" + i;
        $(currentImg)[0].src = "http://openweathermap.org/img/w/" + data.daily[i+1].weather[0].icon + ".png";
        var currentTemp= "#temp-" + i;
        $(currentTemp)[0].textContent = "Temp: " + data.daily[i+1].temp.day + " °F";
        var currentWind= "#wind-" + i;
        $(currentWind)[0].textContent = "Wind: " + data.daily[i+1].wind_speed + " mph";
        var currentHumidity = "#humidity-" + i;
        $(currentHumidity)[0].textContent = "Humidity: " + data.daily[i+1].humidity+ "%";
    }


}

//Takes the date from the API and converts it to normal notation
function convertDate (data, i) {
    var newDate = new Date(data.daily[i+1].dt *1000)

    return (newDate.toLocaleDateString("en-US"))
}

//Event listener to search city when you click on the search button
$("#search-button").click(function(event){
    event.preventDefault();
    searchCity();
})

//Event listener when you click on one of the previously searched cities
$("#searched-cities").on("click", "#individual-city", function () {

    var savedLocation = localStorage.getItem($(this)[0].textContent).split(" , ");
    savedLat = parseFloat(savedLocation[0]);
    savedLon = parseFloat(savedLocation[1]);

    $("#current-city")[0].textContent = $(this)[0].textContent + " (" + dayjs().format('M/D/YYYY') + ")"

    viewSearchedCities();

})

//Pulls up the information for the previously searched city
function viewSearchedCities () {

    var previousAPI = "http://api.openweathermap.org/data/2.5/onecall?lat=" + savedLat + "&lon=" + savedLon + "&exclude=minutely,hourly&units=imperial&appid=b262298fbe39ad30d243f31f6e1297bc";


    fetch(previousAPI)
        .then(function (response) {
            response.json().then(function (data) {
                currentWeather(data);
            })
    })
}