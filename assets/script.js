var cityForm = document.getElementById('city-form');
var forecastGroup= document.querySelectorAll('.card');
var presentDay= document.querySelector('.present-day');
var historyEl= document.querySelector('#history');



function getLatLon(city) {
    fetch(
'https://api.openweathermap.org/geo/1.0/direct?q='
 + city 
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
        
        displayCity(city);
       
        
        
    });
   
    if (city === '') {
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
        

      
        for(var i=0; i <forecastGroup.length; i++) {
            var thisDay= forecastGroup[i];
         
            var weatherOffset= 5;
            var weatherIndex= i*8 + weatherOffset;
           
            var thisWeather= data.list[weatherIndex];
            
            
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

function displayCity (city) {
    var cityDisplay = document.getElementById('city-display')
    cityDisplay.textContent= city.name
}

function saveCityData(city) {
    console.log(city);
    var cityData = JSON.parse(localStorage.getItem('cityData')) || [];
    
    if(cityData.includes(city)){
        return;
    }
    if (cityData.length >= 5){
        cityData.shift()
    }
    cityData.push(city);
    localStorage.setItem('cityData', JSON.stringify(cityData));
}

function createHistoryButton() {
    var searches= JSON.parse(localStorage.getItem('cityData'));
    console.log(searches);
    historyEl.innerHTML=''
        for(var i=0; i < searches.length; i++) {
            console.log(searches[i]);
            var historyButton = document.createElement('button');
            historyButton.textContent = searches[i];
            document.getElementById('history').appendChild(historyButton);
        }
}

cityForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var cityInput = document.getElementById('city-input').value;
    getLatLon(cityInput);
    saveCityData(cityInput.toUpperCase());
    createHistoryButton();
});

historyEl.addEventListener('click', function(event){
    if(!event.target.matches('button')){
        return
    } else {
    var buttonText = event.target.textContent
    getLatLon(buttonText);
    }
});


   
createHistoryButton();



