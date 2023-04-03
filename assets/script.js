var cityForm = document.getElementById('city-form');
var cityInput;
var forecastGroup= document.querySelectorAll('.card');
var presentDay= document.querySelector('.present-day');

cityForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cityInput = document.getElementById('city-input').value;
    getLatLon();
});

function getLatLon() {
    fetch(
'https://api.openweathermap.org/geo/1.0/direct?q='
 + cityInput 
 + '&limit=1&appid=d04b52f8ed3feffd9b0a8ea7bffb3e92&units=imperial'
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var city = {
            name: data[0].name,
            lat: data[0].lat,
            lon: data[0].lon,
            
        }
        
        getWeather(city.lat, city.lon);
        saveCityData(city);
        createHistoryButton(city);
        displayCity(city);
        
        
    });

    if (cityInput === '') {
        alert('Please enter a city name');
    }
}

function getWeather(lat, lon) {
    fetch(
'https://api.openweathermap.org/data/2.5/forecast?lat='
 + lat 
 + '&lon='
 + lon 
 + '&appid=d04b52f8ed3feffd9b0a8ea7bffb3e92&units=imperial'
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        var firstDay= data.list[0];
        console.log(firstDay);

        var firstDate= firstDay.dt_txt.split(' ')[0];
        presentDay.children[1].textContent=firstDate;

        var iconURL= 'https://openweathermap.org/img/w/' + firstDay.weather[0].icon + '.png'
            var iconImage= document.createElement('img');
            iconImage.src=iconURL;
            var iconDisplay= presentDay.children[2]
            iconDisplay.innerHTML='';
            iconDisplay.append(iconImage);
    
        var firstTemp= firstDay.main.temp
        presentDay.children[3].textContent="Temperature: " + firstTemp + '°F'

        var firstWind= firstDay.wind.speed;
        presentDay.children[4].textContent="Wind: " + firstWind + "mph";

        var firstHumidity= firstDay.main.humidity
        presentDay.children[5].textContent= "Humidity: " + firstHumidity + "%";
        

        console.log(data);
        for(var i=0; i <forecastGroup.length; i++) {
            var thisDay= forecastGroup[i];
            console.log(data.list)
            var weatherOffset= 5;
            var weatherIndex= i*8 + weatherOffset;
            console.log(weatherIndex);
            var thisWeather= data.list[weatherIndex];
            console.log(thisWeather)

            var thisDate=thisWeather.dt_txt.split(' ')[0];
            thisDay.children[0].textContent=thisDate;

            var iconURL= 'https://openweathermap.org/img/w/' + thisWeather.weather[0].icon + '.png'
            var iconImage= document.createElement('img');
            iconImage.src=iconURL;
            var iconDisplay= thisDay.children[1]
            iconDisplay.innerHTML='';
            iconDisplay.append(iconImage);
         

            var thisTemp=thisWeather.main.temp
            thisDay.children[2].textContent="Temperature: " + thisTemp + '°F'

            var thisWind=thisWeather.wind.speed;
            thisDay.children[3].textContent="Wind: " + thisWind + "mph";

            var thisHumidity=thisWeather.main.humidity
            thisDay.children[4].textContent= "Humidity: " + thisHumidity + "%";
        }
    });

        }
      
   
     

       
       


       

function saveCityData(city) {
    var cityData = JSON.parse(localStorage.getItem('cityData')) || [];
    cityData.push(city);
    localStorage.setItem('cityData', JSON.stringify(cityData));
}



function createHistoryButton(city) {
    var historyButton = document.createElement('button');
    historyButton.textContent = city.name;
    // historyButton.classList.add('history-button');
    historyButton.addEventListener('click', function () {
        displayCity(city.name);
    });
    document.getElementById('history')
    .appendChild(historyButton);
}




//City input to show in box
function displayCity (city) {
    var cityDisplay = document.getElementById('city-display')
    cityDisplay.textContent= city.name
    
    
}


//local storage


