// api url & key
const url = 'https://api.openweathermap.org/data/2.5/';
const key = '7a31a24f5ecb269aff2bd100e76e17b1';

// items filling the page
var city = document.querySelector('.city');   
var time = document.querySelector('.time');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.description');
var minmax = document.querySelector('.minmax');
var humidity = document.querySelector('.humidity');

var notifToggle = document.getElementById('notification'); // notification appears in typo
notifToggle.classList.remove('ntf-show'); // there's no notification in default page view

var slash = document.getElementById('slash'); // slash between temp & description
slash.style.display = "none";

function setQuery (e) {
    e.preventDefault();
    getResult(searchBar.value);
}

const getResult = (cityName) =>{
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=en`
    fetch(query)
    .then (weather => {
        return weather.json()
    })
    .then(displayResult) // api successfully returns
    .catch(error => {
        searchBar.value = "",    
        returnDefault(); // page returns to default when api gives error
    })  
    }

// function turns page and values back to default when api gives error
function returnDefault () {
    city.innerHTML = ('Learn the Weather'); 
    time.innerHTML = (' ');   
    temp.innerHTML = (' ');
    desc.innerText = (' ');
    minmax.innerHTML = (' ');
    humidity.innerHTML = (' ');
    slash.style.display = "none";

    notifToggle.classList.toggle('ntf-show'); // notification appears when api gives error
}

// results when api successfully returns
const displayResult = (result) =>{

    var tarih = new Date();
    var gunler = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var aylar = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    city.innerHTML = (result.name);    
    time.innerHTML = tarih.getDate() + (' ') + aylar[tarih.getMonth()] + (',') +  (' ') + gunler[tarih.getDay()]    
    temp.innerHTML = Math.round(result.main.temp) + ('°C')
    desc.innerText = result.weather[0].description
    minmax.innerHTML = ('Min') + (' ') + Math.round(result.main.temp_min) + ('°C') + (' ') + ('/') + (' ') + ('Max') + (' ') + (Math.round(result.main.temp_max)) + ('°C')
    humidity.innerHTML = ('Humidity:') + (' ') + result.main.humidity + ('%')

    slash.style.display = "block"; // slash appears when there are results

    searchBar.value = "";

    notifToggle.classList.remove('ntf-show'); // notification doesnt appear when api returns results

    console.log(result);

}

const searchBar = document.getElementById('searchBar'); // searchbar event
const form = document.getElementById('form').addEventListener('submit', setQuery); // event submitting querry