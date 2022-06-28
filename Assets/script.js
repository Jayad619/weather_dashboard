const recentSearchesContainer = $("#recent-searches-container");
const searchForm = $("#search-form");

const readFromLocalStorage = (key, defaultValue) => {
    // get from LS using key name
    const dataFromLS = localStorage.getItem(key);
  
    // parse data from LS
    const parsedData = JSON.parse(dataFromLS);
  
    if (parsedData) {
      return parsedData;
    } else {
      return defaultValue;
    }
  };

  const writeToLocalStorage = (key, value) => {
      // convert value to string
      const stringifiedValue = JSON.stringify(value);

    //   set stringified value to LS for key name
    localStorage.setItem(key, stringifiedValue);
  };

const renderRecentSearches = () => {

    // get recent searches from LS
    const recentSearches = readFromLocalStorage("recentSearches",[]);

    //("foo","bar")
    if(recentSearches.length) {

        const createRecentCity = (city) => {
            return `<li class="list-group-item" data-city="${city}"> ${city}</li>`
        };

    const recentCities = recentSearches.map(createRecentCity).join("");

        console.log(recentCities)
    //else render recent searches list
    const ul = `<ul class="list-group">
    ${recentCities}
  </ul>`;

  // append to parent
  recentSearchesContainer.append(ul);

    } else {
        //if empty show alert
    const alert = `<div class ="alert alert-warning" role="alert">
            No searches
        </div>`;

        // append to parent
        recentSearchesContainer.append(alert);
    }
};

const handleRecentSearchClick =(event) => {
    const target = $(event.target);

    // restrict clicks only from li's
    if (target.is("li")) {
        // get data city attribute
        const cityName = target.attr("data-city");
        console.log(cityName);
    }
};

// logging search click
const handleFormSubmit = (event) => {
    event.preventDefault();

    // get form input value
    const cityName = $("#search-input").val();

    //validate
    if (cityName) {
        console.log (cityName);

    // get recent searches from LS
    const recentSearches = readFromLocalStorage("recentSearches", []);

    // push city name to array
    recentSearches.push(cityName);

    // write recent searches to LS
    writeToLocalStorage("recentSearches", recentSearches);
    
    //remove previous items
    recentSearchesContainer.children().last().remove();

    // re-render recent cities
    renderRecentSearches();
    }
};

//trying to log data
// button.click((function(){
//     const city = $('#city-input').val()
//     const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
    
//     fetch(queryURL)
//     .then(response => response.json())
//     // .then(data => makeCards(data))
//     console.log(data.weather)
//     console.log(data.name)
//     console.log(data.main.temp)
// }));

const onReady = () => {
    renderRecentSearches();
}; 

recentSearchesContainer.click(handleRecentSearchClick)
searchForm.submit(handleFormSubmit);
$(document).ready(onReady)

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



// //function to show saved city button after refresh
// function showSavedData() {
//     var cityArr = JSON.parse(localStorage.getItem('citylist'));


//     for (var i = 0; i < cityArr.length; i++) {
//         console.log("cityArr", cityArr);

//          // Then dynamicaly generating buttons for each city in the array
//          var a = $("<button>").attr({ "class": "list-group-item list-group-item-action", "id": cityArr[i] });

//          // Providing the initial button text
//          a.text(cityArr[i]);
//          // Adding the button to the buttons-view div
//          $("#buttons-view").append(a);
 
//          $("#" + cityArr[i]).on("click", function (event) {
//              event.preventDefault();
 
//              var cityName = this.id;
 
//              getWeatherToday(cityName, "existing");
//              getWeatherForecast(cityName, APIKey);
 
 
//          });
//     }


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