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
  let farehietValue = (celsuisTemp * 9/5) + 32;
  let temperatureElement = document.querySelector("#display-temperature");
  temperatureElement.innerHTML = Math.round(farehietValue);
}

function showCelsiusTemp(event){
  event.preventDefault()
  let temperatureElement = document.querySelector("#display-temperature");
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
  showFarenheitTemp()
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
