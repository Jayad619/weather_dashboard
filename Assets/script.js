// global variable 
var button = document.querySelector('.find-city')
var cityInput = $("#city-input").val();
// search history array
var cityArr = [];
// link weather api */
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;
/* weather api key */
var APIKey = "bf0bd255e9d89ab52a766cb923df7039";

button.addEventListener('click', function(){
    fetch(queryURL)
    .then(response => response.json())
    .then(data => console.log(data))
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