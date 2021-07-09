//displaying current time
let currTime = new Date();
function formatDate(currTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currTime.getDay()];
  let hour = currTime.getHours();
  let minutes = currTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

//different cities and their weather
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

//Display the weather based on inputted city
function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let tempHeader = document.querySelector("#curr-temp");
  tempHeader.innerHTML = temp;
}

//Change the city based on input
function changeCity(event) {
  event.preventDefault();
  let currentCityHeader = document.querySelector("#curr-city");
  let cityVal = document.querySelector("#city-val");
  currentCityHeader.innerHTML = cityVal.value;
  let currCity = cityVal.value;

  //Adjusting the weather based on the input city
  let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}&&units=metric`;
  axios.get(weatherUrl).then(displayWeather);
}

let inputForm = document.querySelector("#city-form");
inputForm.addEventListener("submit", changeCity);

let timeHeader = document.querySelector("#current-time");
timeHeader.innerHTML = formatDate(currTime);

//Weather based on current location
let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&${apiKey}`;

function geoWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let tempHeader = document.querySelector("#curr-temp");
  tempHeader.innerHTML = temp;
}
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(geoWeather);
}
function weatherButton() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let locationButton = document.querySelector("#geo-button");
locationButton.addEventListener("click", weatherButton);
