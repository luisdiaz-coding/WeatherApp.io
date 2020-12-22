const api = {

key: "d2785989a40845e85cf1e3a9d05a0918"


}

const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {

if (evt.keyCode == 13) {
getResults(searchbox.value);
console.log(searchbox.value);
}




}


function getResults (query) {

 fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}&units=metric`)
  .then(weather => {
          return weather.json();  ///Http Request 
  }) .then(displayResults);



  }

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();

    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}