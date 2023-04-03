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
      

        // for(var i=0; i <40; i += 8) {
        //     var info = {
        //         time: (data.list[i].dt_txt ),
        //         icon: (data.list[i].weather[0].icon),
        //         temp: (data.list[i].main.temp + '°F'),
        //         wind: (data.list[i].wind.speed + ' MPH'),
        //         humidity: (data.list[i].main.humidity + '%'),
        //     }
        //     // console.log(i, info);
        // }
        // var i = {
        //     zero: 0,
        //     eight: 8,
        //     sixteen: 16,
        //     twentyfour: 24,
        //     thirtytwo: 32,
        // }
        // console.log(i.zero)

        var i=0;
        var info= {
            time: (data.list[i].dt_txt ),
            icon: (data.list[i].weather[0].icon),
            temp: (data.list[i].main.temp + '°F'),
            wind: (data.list[i].wind.speed + ' MPH'),
            humidity: (data.list[i].main.humidity + '%'),
        }
        var day1Display = document.getElementById('day1-display')
        day1Display.textContent= JSON.stringify(info);
        var i=8;
        var info= {
            time: (data.list[i].dt_txt ),
            icon: (data.list[i].weather[0].icon),
            temp: (data.list[i].main.temp + '°F'),
            wind: (data.list[i].wind.speed + ' MPH'),
            humidity: (data.list[i].main.humidity + '%'),
        }

        var day2Display = document.getElementById('day2-display')
        day2Display.textContent= JSON.stringify(info);

        var i=16;
        var info= {
            time: (data.list[i].dt_txt ),
            icon: (data.list[i].weather[0].icon),
            temp: (data.list[i].main.temp + '°F'),
            wind: (data.list[i].wind.speed + ' MPH'),
            humidity: (data.list[i].main.humidity + '%'),
        }

        var day3Display = document.getElementById('day3-display')
        day3Display.textContent= JSON.stringify(info);

        var i=24;
        var info= {
            time: (data.list[i].dt_txt ),
            icon: (data.list[i].weather[0].icon),
            temp: (data.list[i].main.temp + '°F'),
            wind: (data.list[i].wind.speed + ' MPH'),
            humidity: (data.list[i].main.humidity + '%'),
        }

        var day4Display = document.getElementById('day4-display')
        day4Display.textContent= JSON.stringify(info);

        var i=32;
        var info= {
            time: (data.list[i].dt_txt ),
            icon: (data.list[i].weather[0].icon),
            temp: (data.list[i].main.temp + '°F'),
            wind: (data.list[i].wind.speed + ' MPH'),
            humidity: (data.list[i].main.humidity + '%'),
        }

        var day5Display = document.getElementById('day5-display')
        day5Display.textContent= JSON.stringify(info);
        

    
    
    

         displayInfo(info);
   
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
        displayCity(historyButton.textContent);
    });
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
    var iconURL = 'https://openweathermap.org/img/w/' + info.icon + '.png';
    var iconImage = document.createElement('img');
    iconImage.src= iconURL;
    var iconDisplay = document.getElementById('icon-display')
    iconDisplay.append(iconImage);
    

    
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


