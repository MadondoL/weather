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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML += `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII=" alt="forecast" />
        <div class="days-temperature">
          <span class="tempMax">23°</span>
          <span class="tempMin">19°</span>
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
  getForecast(response.data.coord);
}

// Function to get the weather forecast
function getForecast(coordinates) {
  let apiKey = "e0993610d858f5529b5b4f6a32da6070";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
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
displayForecast();
