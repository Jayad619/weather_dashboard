// global variable 
var button = $('#find-city');
// var cityInput = $('#city-input')
// search history array
var cityArr = [];
/* weather api key */
var weatherKey = "bf0bd255e9d89ab52a766cb923df7039";
// link weather api */
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+ weatherKey;
// "https://api.openweathermap.org/data/2.5/weather?q=birmingham&appid=bf0bd255e9d89ab52a766cb923df7039";

// trying to log the weather data

button.click((function(){
    const city = $('#city-input').val()
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
    
    fetch(queryURL)
    .then(response => response.json())
    .then(data => makeCards(data))
}));


//function to show saved city button after refresh
function showSavedData() {
    var cityArr = JSON.parse(localStorage.getItem('citylist'));


    for (var i = 0; i < cityArr.length; i++) {
        console.log("cityArr", cityArr);

         // Then dynamicaly generating buttons for each city in the array
         var a = $("<button>").attr({ "class": "list-group-item list-group-item-action", "id": cityArr[i] });

         // Providing the initial button text
         a.text(cityArr[i]);
         // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
 
         $("#" + cityArr[i]).on("click", function (event) {
             event.preventDefault();
 
             var cityName = this.id;
 
             getWeatherToday(cityName, "existing");
             getWeatherForecast(cityName, APIKey);
 
 
         });
    }
}
// function to generate cards
function makeCards (data){
    console.log(data.weather)
    console.log(data.name)
    console.log(data.main.temp)
}

/* dom elements
grab search form
grab search input
grab container for todays weather
grab 5 day forecast
grab search history buttons
*/

/* function to grab search history
for loop to create buttons for previously searched cities
another function to update locas storage based on search history 
function to get search history from local storage
creating html elements and workin w api
*/