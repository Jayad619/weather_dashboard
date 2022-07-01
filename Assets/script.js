const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
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

const constructUrl = (baseUrl, params) => {
    const queryParams = new URLSearchParams(params).toString();
  
    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  };
  
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

    const renderCurrentData = (data) => {
        console.log(data);
        const currentWeatherCard = `<div>
        <h2>${data.cityName}<h2>
        <h5>Monday, 9th May, 2022</h5>
        <img 
        src="http://openweathermap.org/img/w/${data.weaherdata.current.weather[0].icon}.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />

        
            <div class = "row g-0 border">
                <div class="col-sm-12 col-md 4 ">Temperature</div>
                <div class="col-sm-12 col-md 8 ">${data.weaherdata.current.temp}&deg; C</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 col-md 4 ">Humidity</div>
                <div class="col-sm-12 col-md 8 ">${data.weaherdata.current.humidity}&percnt;</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 col-md 4 ">Wind Speed</div>
                <div class="col-sm-12 col-md 8 ">${data.weaherdata.current.wind_speed}MPH</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 col-md 4 ">UV Index</div>
                <div class="col-sm-12 col-md 8 ">
                    <span class="bg-success text-white px-3 rounded-2">${data.weaherdata.current.uvi}</span>
                </div>
            </div>
        </div>`;

    weatherInfoContainer.append(currentWeatherCard);
    };

    const renderForecastdata = () => {
        const forecastWeatherCards = `<div>
        <h3>5 Day Forecast</h3>
        <hr />
        <div>
            <div class="d-flex flex-row justify-content-center flex-wrap">

                <div class="card-body m-2">
                    <img 
        src="http://openweathermap.org/img/w/04d.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
                  <h5 class="card-title">Tuesday, 10th May</h5>
                  <div class="mt-4">
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                        <div class="col-sm-12 p-3 col-md 8 ">16 &deg;C</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                        <div class="col-sm-12 p-3 col-md 8 ">20 &percnt;</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                        <div class="col-sm-12 p-3 col-md 8 ">10 MPH</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                        <div class="col-sm-12 p-3 col-md 8 ">
                            <span class="bg-success text-white px-3 rounded-2">1.5</span>
                        </div>
                    </div>

                  </div>
                </div>
                <div class="card-body m-2">
                    <img 
        src="http://openweathermap.org/img/w/04d.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
                  <h5 class="card-title">Tuesday, 10th May</h5>
                  <div class="mt-4">
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                        <div class="col-sm-12 p-3 col-md 8 ">16 &deg;C</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                        <div class="col-sm-12 p-3 col-md 8 ">20 &percnt;</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                        <div class="col-sm-12 p-3 col-md 8 ">10 MPH</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                        <div class="col-sm-12 p-3 col-md 8 ">
                            <span class="bg-success text-white px-3 rounded-2">1.5</span>
                        </div>
                    </div>

                  </div>
                </div>
                <div class="card-body m-2">
                    <img 
        src="http://openweathermap.org/img/w/04d.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
                  <h5 class="card-title">Tuesday, 10th May</h5>
                  <div class="mt-4">
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                        <div class="col-sm-12 p-3 col-md 8 ">16 &deg;C</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                        <div class="col-sm-12 p-3 col-md 8 ">20 &percnt;</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                        <div class="col-sm-12 p-3 col-md 8 ">10 MPH</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                        <div class="col-sm-12 p-3 col-md 8 ">
                            <span class="bg-success text-white px-3 rounded-2">1.5</span>
                        </div>
                    </div>

                  </div>
                </div>
                <div class="card-body m-2">
                    <img 
        src="http://openweathermap.org/img/w/04d.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
                  <h5 class="card-title">Tuesday, 10th May</h5>
                  <div class="mt-4">
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                        <div class="col-sm-12 p-3 col-md 8 ">16 &deg;C</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                        <div class="col-sm-12 p-3 col-md 8 ">20 &percnt;</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                        <div class="col-sm-12 p-3 col-md 8 ">10 MPH</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                        <div class="col-sm-12 p-3 col-md 8 ">
                            <span class="bg-success text-white px-3 rounded-2">1.5</span>
                        </div>
                    </div>

                  </div>
                </div>
                <div class="card-body m-2">
                    <img 
        src="http://openweathermap.org/img/w/04d.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
                  <h5 class="card-title">Tuesday, 10th May</h5>
                  <div class="mt-4">
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                        <div class="col-sm-12 p-3 col-md 8 ">16 &deg;C</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                        <div class="col-sm-12 p-3 col-md 8 ">20 &percnt;</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                        <div class="col-sm-12 p-3 col-md 8 ">10 MPH</div>
                    </div>
                    <div class = "row g-0 border">
                        <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                        <div class="col-sm-12 p-3 col-md 8 ">
                            <span class="bg-success text-white px-3 rounded-2">1.5</span>
                        </div>
                    </div>

                  </div>
                </div>
              </div>

        </div>
        </div>`;

        weatherInfoContainer.append(forecastWeatherCards);
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

        // console.log(recentCities)
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

const fetchWeatherData = async (cityName) => {
    // fetch data from API
    // current data url
    const currentDataUrl = constructUrl("https://api.openweathermap.org/data/2.5/weather",
        {
        q: cityName,
        appid: "bf0bd255e9d89ab52a766cb923df7039",
        }
    );

    const currentData = await fetchData(currentDataUrl);

    //  get lat,lon and city name
    const lat = currentData?.coord?.lat;
    const lon = currentData?.coord?.lon;
    const displayCityName = currentData?.name;

    console.log (lat,lon,displayCityName);

    // forecast url
    const forecastDataUrl = constructUrl(
        "https://api.openweathermap.org/data/2.5/onecall",
        {
          lat: lat,
          lon: lon,
          exclude: "minutely,hourly",
          units: "metric",
          appid: "bf0bd255e9d89ab52a766cb923df7039",
        }
      );

      const forecastData = await fetchData(forecastDataUrl);

      console.log(forecastData);

      return {
          cityName : displayCityName,
          weaherdata: forecastData,
      };
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
const handleFormSubmit = async (event) => {
    event.preventDefault();

    // get form input value
    const cityName = $("#search-input").val();

    //validate
    if (cityName) {
        // fetch weatherdata
        const weatherData = await fetchWeatherData(cityName)

    // render current data
    renderCurrentData(weatherData);

    // render 5 day forecast
    renderForecastdata(weatherData);

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