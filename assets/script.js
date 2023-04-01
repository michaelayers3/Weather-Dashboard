var cityForm = document.getElementById('city-form');
var cityInput;

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
        displayCity(city, city.time );
        
        
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
        console.log(data);
        for(var i=0; i <40; i += 8) {
            console.log(i, data.list[i]);
        }

        var info = {
            temp: (data.list[0].main.temp + '°F'),
            wind: (data.list[0].wind.speed + ' MPH'),
            humidity: (data.list[0].main.humidity + '%'),
            time: (data.list[0].dt_txt),
        };
        console.log(info.time);
displayWeather(info);
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
    historyButton.classList.add('history-button');
    // historyButton.addEventListener('click', function () {
    //     getWeather(city.lat, city.lon);
    // });
    document.getElementById('history')
    .appendChild(historyButton);
}




//City input to show in box
function displayCity (city) {
    var cityDisplay = document.getElementById('city-display')
    // var time = dayjs();
    // today.format('DD/MM/YYYY');
    cityDisplay.textContent= city.name
    
    
}


//city temp wind and humidity to show in box
function displayWeather (info) {
    var tempDisplay = document.getElementById('temp-display')
    tempDisplay.textContent= info.temp
    var windDisplay = document.getElementById('wind-display')
    windDisplay.textContent= info.wind
    var humidityDisplay = document.getElementById('humidity-display')
    humidityDisplay.textContent= info.humidity
    var timeDisplay = document.getElementById('time-display')
    timeDisplay.textContent= info.time
    
}


   
                
//5 day forecast to show in cards in box

// icons

//local storage


