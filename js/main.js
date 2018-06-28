//declare variables and select elements
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
var API_KEY = "9347522dfc18eb6dc577618e6c9e8db1"
//select the elements cityTitle, zip input bar, weather div, img with clas icon, span with class temp, span with class humid, select the span with the class deg

var cityTitle = document.querySelector('.cityTitle')
var zipInput = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var imgIcon = document.querySelector('.icon')
var spanTemp = document.querySelector('.temp')
var spanHumid = document.querySelector('.humid')
var spanDeg = document.querySelector('.deg')
var btn = document.querySelector('.convert')
var f 
var icons = {
    "Cloudy": "img/partlycloudy.gif",
    "Thunderstorm": "img/thunderStorm.gif",
    "Rain": "img/rainy.gif",
    "Snow": "img/snowy.gif",
    "Clear": "img/sunny.gif",
    "Partly Cloudy": "img/partlycloudy.gif"

}
//define functions
function iconSelector(weather) {
    return icons[weather]
    //icons['Clouds']
}
function FtoC(f) {
    return Math.round((f - 32) * (5 / 9))
}
function kelvintoFaren(kelvin) {
    return Math.round((kelvin * 9 / 5) - 459.67)
}



function getWeather(zipCode) {
    // console.log(zipCode)
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            cityTitle.textContent = data.name
            weather.textContent = data.weather[0].main
            f = kelvintoFaren(data.main.temp)
            spanTemp.textContent = f
            spanHumid.textContent = data.main.humidity
            imgIcon.src = iconSelector(data.weather[0].main)
        },
        error: function (error) {
            console.log("There was an error")
        }
    })
}

getWeather(33166)

//call functions and/or add Event Listeners
zipInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        getWeather(zipInput.value)
    }
})
btn.addEventListener("click", function () {
    if (btn.textContent == "Convert to C") {
        spanTemp.textContent = FtoC(spanTemp.textContent)
        spanDeg.innerHTML = "&deg; C"
        btn.textContent = "Convert to F"
    } else { 
        spanTemp.textContent = f
        spanDeg.innerHTML = "&deg; F"
        btn.textContent = "Convert to C"
    }


    // if(.click == "Click"){
    //    return kelvinintoCels(spanTemp.value)
    // } else if (e.click == "dbClick"){
    //     return kelvinintoFaren(spanTemp.value) 
    // }
})