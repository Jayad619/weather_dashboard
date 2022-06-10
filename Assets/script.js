// global variable 
var button = $('#find-city');
var cityInput = $('#city-input').val();
// search history array
var cityArr = [];
/* weather api key */
var weatherKey = "bf0bd255e9d89ab52a766cb923df7039";
// link weather api */
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+ weatherKey;
// "https://api.openweathermap.org/data/2.5/weather?q=birmingham&appid=bf0bd255e9d89ab52a766cb923df7039";


function buttonclick(response) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+ weatherKey;
    button.click((function(){
    fetch(queryURL)
    .then(response => response.json())
    .then(data => console.log(data))
    cityInput = response.name;
    }),
console.log(cityInput));

}
buttonclick()


// console.log("hello"),
    

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