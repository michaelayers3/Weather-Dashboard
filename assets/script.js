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
        console.log(data);
        for(var i=0; i <40; i += 8) {
            // console.log(i, data.list[i]);
        }
      

        for(var i=0; i <40; i += 8) {
            var info = {
                time: (data.list[i].dt_txt ),
                icon: (data.list[i].weather[0].icon),
                temp: (data.list[i].main.temp + '°F'),
                wind: (data.list[i].wind.speed + ' MPH'),
                humidity: (data.list[i].main.humidity + '%'),
            }
            console.log(i, info);
        }
        var day1Display = document.getElementById('day1-display')
        // var day2Display = document.getElementById('day2-display')
        // var day3Display = document.getElementById('day3-display')
        // var day4Display = document.getElementById('day4-display')
        // var day5Display = document.getElementById('day5-display')

    
    day1Display.innerHTML = 
    `<div>
    <p>Time: ${info.time}</p>
    <img src="${info.icon}">
    <p>Temperature: ${info.temp}</p>
    <p>Wind Speed: ${info.wind}</p>
    <p>Humidity: ${info.humidity}</p>
  </div>
  `
       
    //     }else if (i === 8) {
    // day2Display.innerHTML = `
    // <div>
    //     <p>Time: ${info.time}</p>
    //     <img src="${info.icon}">
    //     <p>Temperature: ${info.temp}</p>
    //     <p>Wind Speed: ${info.wind}</p>
    //     <p>Humidity: ${info.humidity}</p>
    // </div>`
    //     }else if (i === 16) {   
    // day3Display.innerHTML = `
    // <div>
    //     <p>Time: ${info.time}</p>
    //     <img src="${info.icon}">
    //     <p>Temperature: ${info.temp}</p>
    //     <p>Wind Speed: ${info.wind}</p>
    //     <p>Humidity: ${info.humidity}</p>
    // </div>`
    //     }else if (i === 24) {   
    // day4Display.innerHTML = `
    // <div>
    //     <p>Time: ${info.time}</p>
    //     <img src="${info.icon}">
    //     <p>Temperature: ${info.temp}</p>
    //     <p>Wind Speed: ${info.wind}</p>
    //     <p>Humidity: ${info.humidity}</p>
    // </div>`
    //     }else if (i === 32) {
    // day5Display.innerHTML = `
    // <div>
    //     <p>Time: ${info.time}</p>
    //     <img src="${info.icon}">
    //     <p>Temperature: ${info.temp}</p>
    //     <p>Wind Speed: ${info.wind}</p>
    //     <p>Humidity: ${info.humidity}</p>
    // </div>`
    


         displayInfo(info);
        //  day1(info);
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
    cityDisplay.textContent= city.name
    
    
}


//city temp wind and humidity to show in box

function displayInfo (info) {
    // var iconDisplay = document.getElementById('icon-display').src = 'https://openweathermap.org/img/w/' + info.icon + '.png';
    // // var iconURL = 'https://openweathermap.org/img/w/' + info.icon + '.png';
    // console.log(iconDisplay);
    var tempDisplay = document.getElementById('temp-display')
    tempDisplay.textContent= info.temp

    var windDisplay = document.getElementById('wind-display')
    windDisplay.textContent= info.wind

    var humidityDisplay = document.getElementById('humidity-display')
    humidityDisplay.textContent= info.humidity

    var timeDisplay = document.getElementById('time-display')
    timeDisplay.textContent= info.time
    
}



// function day1 (info) {
//     var day1Display = document.getElementById('day1-display')
//     day1Display.textContent= in

// }

                
//5 day forecast to show in cards in box


// icons

//local storage


