const searchEngineDropdown = document.getElementById('dropbtn');
const searchEngineGoogle = document.getElementById('search-engine-1');
const searchEngineBing = document.getElementById('search-engine-2');
const searchEngineEcosia = document.getElementById('search-engine-3');
const searchEngineDuckDuckGo = document.getElementById('search-engine-4');
const searchBox = document.getElementById('searchbox');
const searchIcon = document.getElementById('search-icon');
const backgroundImage = document.body;
const searchEngineList = [searchEngineBing, searchEngineDuckDuckGo, searchEngineEcosia, searchEngineGoogle];
const weatherTemp = document.getElementById('temp');
const weatherLocation = document.getElementById('location');
const weatherIcon = document.getElementById('weather-display');
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const statusDisplay = document.getElementById('status');
let status = '';
let batteryHealth = '';



const dayList = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
    updateChargeInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));
  }

  battery.addEventListener('levelchange', function(){
    updateLevelInfo();
  });
  function updateLevelInfo(){
    let batteryLevel = (battery.level * 100);
    batteryHealth = Math.floor(batteryLevel) + '% ' + (battery.charging ? 'Charging' : 'Battery');
  }
  updateStatus();
});

const speed = navigator.connection.downlink
const connection = navigator.onLine 
? (speed === 10 ? '> ' + speed : '~' + speed) + ' Mbps'
: 'Offline'

function updateStatus() {
  status = `${connection} · ${batteryHealth} `;
  statusDisplay.textContent = status;
}



// // Unsplach API Info
// const loadCountAPI = 1
// const apiKey = 'bjVy6tNV1_Qnf8QDIYzw6SaUHxSwfB0FXHJpHK4U3bQ';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query="street+photography"&count=${loadCountAPI}&auto=format&fit=crop&w=1450&q=80`;

// OpenWeather API info
const cityName = 'Munich';
const unit = 'Metric';
const apiWeather = '6f05229db3b719f4b5f913c4b731b34b';
const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiWeather}&units=${unit}`;

function switchSearchEngine(e) {
  if (e.target.innerHTML === 'DuckDuckGo') {
  // Switch Icon
  searchIcon.src = 'img/duckduckgo_icon.png';
  // Swtich action url
  searchBox.action = "https://duckduckgo.com/";
  } else if (e.target.innerHTML === 'Bing') {
    // Switch Icon
    searchIcon.src = 'img/bing_icon.png';
    // Swtich action url
    searchBox.action = "https://www.bing.com/search";
  } else if (e.target.innerHTML === 'Ecosia'){
      // Switch Icon
      searchIcon.src = 'img/ecosia_icon.png';
      // Swtich action url
      searchBox.action = "https://www.ecosia.org/search";
  } else {
        // Switch Icon
        searchIcon.src = 'img/google_icon.png';
        // Swtich action url
        searchBox.action = "https://www.google.com/search";
  }
}
function updateImage() {
  backgroundImage.style.background = `url(${apiImage[0].urls.raw})`;
}

async function getImage() {
  try {
      const res = await fetch(apiUrl);
      apiImage = await res.json();
      console.log(apiImage);
      updateImage();
  } catch (error) {
     // Catch Error Here
  }
}

async function getWeather() {
  try {
    const resW = await fetch(urlWeather);
    weatherData = await resW.json();
    console.log(weatherData);
    console.log(weatherData.main.temp);
    console.log(weatherData.weather[0].main);
    weatherTemp.textContent = Math.floor(weatherData.main.temp);
    console.log(weatherData.weather[0].id);
    weatherIcon.classList.add('owf-' + weatherData.weather[0].id);

  } catch (error) {
    // Catch Error Here
 }
}

function getTime() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();
    if (minutes < 10) {
      let belowTen = `0${minutes}`;
      timeDisplay.textContent = `${hours}:${belowTen}`;
    } else {
      timeDisplay.textContent = `${hours}:${minutes}`;
    }
}

function getDate() {
  const now = new Date();
  let month = now.getMonth();
  let date = now.getDate();
  let day = now.getDay();
  dateDisplay.textContent = `${dayList[day]}, ${date}th ${monthList[month]}`;
}


// Add Event Listener
searchEngineList.forEach((search) => {
  search.addEventListener('click', switchSearchEngine);
});



// getImage();
getWeather();
getTime();
setInterval(getTime, 10000);
getDate();