

var searchCity = function() {
    $("#search-button").click(function(event){
    event.preventDefault();

    var city = $("#city-input").val().trim();

    console.log("city name:", city);

    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c97f1cd354b9dea64133acfd0f866f22';
    fetch(requestUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            document.getElementById("current-city").textContent = city + " (" + dayjs().format('MM/D/YYYY') + ")"
            
            });
        } else {
            alert("City not found")
        }
  })
})
}


searchCity();



$(function(){

    
});

