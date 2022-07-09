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
      if(value?.length > 5){
          value.shift();
        }
        const stringifiedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifiedValue); 
      //   set stringified value to LS for key name
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

  const getUviClassName = (uvi) => {
    if (uvi >= 0 && uvi <= 2) {
      return "bg-success";
    }
  
    if (uvi > 2 && uvi <= 8) {
      return "bg-warning";
    }
    if (uvi > 8) {
      return "bg-danger";
    }
  };

    const renderCurrentData = (data) => {
        console.log(data);
        const currentWeatherCard = `<div>
        <h2>${data.cityName}<h2>
        <h5> ${moment
            .unix(data.weaherdata.current.dt + data.weaherdata.timezone_offset)
            .format("dddd, Do MMM, YYYY HH:mm:ss")} </h5>
        <img 
        src="http://openweathermap.org/img/w/${data.weaherdata.daily[0].weather[0].icon}.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />

        
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
                    <span class=" text-white px-3 rounded-2 ${getUviClassName(data.weaherdata.current.uvi)}">${data.weaherdata.current.uvi}</span>
                </div>
            </div>
        </div>`;

    weatherInfoContainer.append(currentWeatherCard);
    };

    const renderForecastdata = (data) => {
        const createForecastCard = (each) => {
            console.log(each)
            const forecast = `<div class="card-body m-2">
            <img 
src="http://openweathermap.org/img/w/${each.weather[0].icon}.png" alt="weather icon" class="shadow-sm p-3 bg-body rounded border mb-3 mt-2 " />
          <h5 class="card-title">${moment.unix(each.dt).format("ddd, Do MMM")} </h5>
          <div class="mt-4">
            <div class = "row g-0 border">
                <div class="col-sm-12 p-2 col-md 4 ">Temperature</div>
                <div class="col-sm-12 p-3 col-md 8 ">${each.temp.day}&deg;C</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 p-2 col-md 4 ">Humidity</div>
                <div class="col-sm-12 p-3 col-md 8 ">${each.humidity}&percnt;</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 p-2 col-md 4 ">Wind Speed</div>
                <div class="col-sm-12 p-3 col-md 8 ">${each.wind_speed}MPH</div>
            </div>
            <div class = "row g-0 border">
                <div class="col-sm-12 p-2 col-md 4 ">UV Index</div>
                <div class="col-sm-12 p-3 col-md 8 ">
                    <span class=" text-white px-3 rounded-2 ${getUviClassName(each.uvi)}">${each.uvi}</span>
                </div>
            </div>

          </div>
        </div>`;

        return forecast;
        };
        const forecastCards = data.weaherdata.daily.slice(1, 6).map(createForecastCard).join("");

        const forecastWeatherCards = `<div>
        <h3>5 Day Forecast</h3>
        <hr />
        <div>
            <div class="d-flex flex-row justify-content-center flex-wrap">

              ${forecastCards}  

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
            return `<li class="list-group-item" data-city="${city}"> ${city}</li>`;
        };

    const recentCities = recentSearches.map(createRecentCity).join("");

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

const renderErrorAlert = () => {
    // empty container
    weatherInfoContainer.empty();

    const alert = `<div class ="alert alert-danger" role="alert"> 
    Something went wrong! Please try again. 
    </div>`;

    weatherInfoContainer.append(alert);
};

const renderWeatherInfo = async (cityName) => {

    try {
        // fetch weatherdata
    const weatherData = await fetchWeatherData(cityName);

    // empty container
    weatherInfoContainer.empty();

     // render current data
     renderCurrentData(weatherData);

     // render 5 day forecast
     renderForecastdata(weatherData);

     return true;
    } catch (error) {
        renderErrorAlert();
        return false;
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

const handleRecentSearchClick = async (event) => {
    const target = $(event.target);

    // restrict clicks only from li's
    if (target.is("li")) {
        // get data city attribute
        const cityName = target.attr("data-city");
        
        await renderWeatherInfo (cityName)
    }
};

// logging search click
const handleFormSubmit = async (event) => {
    event.preventDefault();

    // get form input value
    const cityName = $("#search-input").val();

    //validate
    if (cityName) {

        // render weather cards
        const renderStatus = await renderWeatherInfo(cityName);

    // get recent searches from LS
    const recentSearches = readFromLocalStorage("recentSearches", []);

        if (!recentSearches.includes(cityName) && renderStatus) {
             // push city name to array
    recentSearches.push(cityName);

    // write recent searches to LS
    writeToLocalStorage("recentSearches", recentSearches);
    
    //remove previous items
    recentSearchesContainer.children().last().remove();

    // re-render recent cities
    renderRecentSearches();
        }
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
