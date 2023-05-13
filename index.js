// Function to update the temperature
function updateTemperature(response) {
  let roundtemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#display-temperature");
  temperatureElement.innerHTML = `${roundtemp}`;

  celsuisTemp = response.data.main.temp;
}
function changeIcon(response) {
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  iconElement.setAttribute("src", iconUrl);
}
// update Precipitation

function updatePrecipitation(response){
  let roundpre = Math.round(response.data.clouds.all);
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `${roundpre} %`;
}

function updateHumidity(response){
  let roundhumid = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector("#humid")
  humidElement.innerHTML = `${roundhumid} %`
}

function updateWindSpeed(response){
  let roundwind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windy");
  windElement.innerHTML = `${roundwind} km/h`
}

// Function to update the date and time
function updateDate() {
  let now = new Date();
  let li = document.querySelector(".day");
  let hour = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  li.textContent = `${day}, ${hour}:${minutes}`;
}
function displayForecast(forecastData) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay) {
    let day = forecastDay.toLocaleDateString("en-US", { weekday: "short" }); // Get short weekday name
    let iconCode = forecastDay.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);

    forecastHTML += `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
        <img src="${iconUrl}" width="200" alt="forecast" />
        <div class="days-temperature">
          <span class="tempMax">${maxTemp}°</span>
          <span class="tempMin">${minTemp}°</span>
        </div>
      </div>`;
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


// Function to update the weather based on city input
function getWeatherByCity(city) {
  let apiKey = "e0993610d858f5529b5b4f6a32da6070";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

// Function to update the weather based on current position
function getWeatherByPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e0993610d858f5529b5b4f6a32da6070";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  let town = document.querySelector(".town");
  town.textContent = `${city}`
  getWeatherByCity(city);

}
// Function to handle the "current" button click
function handleCurrentButtonClick() {
  navigator.geolocation.getCurrentPosition(getWeatherByPosition);
}

function showFarenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#display-temperature");
  celsiusElement.classList.remove("active");
  farenheitElement.classList.add("active");
  let farehietValue = (celsuisTemp * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(farehietValue);
}

function showCelsiusTemp(event){
  event.preventDefault()
  let temperatureElement = document.querySelector("#display-temperature");
  celsiusElement.classList.add("active")
  farenheitElement.classList.remove("active")
  temperatureElement.innerHTML = Math.round(celsuisTemp)
}

// Function to update the weather display
function updateWeather(response) {
  let town = document.querySelector(".town");
  town.innerHTML = response.data.name;

  updateTemperature(response);
  updateDate();
  updatePrecipitation(response);
  updateHumidity(response);
  updateWindSpeed(response);
  changeIcon(response);
  showFarenheitTemp(event);
  getForecast(response.data.coord)
}

// Function to get the weather forecast
function getForecast(coordinates) {
  let forecastData = response.data.daily; 
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
   // Extract forecast data from the response
    displayForecast(forecastData); // Pass the forecast data to the displayForecast function
  });
}

let celsuisTemp = null;

// add event listner celsius
let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", showCelsiusTemp)
// add farenheits 

let farenheitElement = document.querySelector("#farenheits");
farenheitElement.addEventListener("click", showFarenheitTemp)

// Add event listener to the form
let form = document.querySelector("#city-input");
form.addEventListener("submit", handleFormSubmit);

// Add event listener to the "current" button
let button = document.querySelector("#current");
button.addEventListener("click", handleCurrentButtonClick);
