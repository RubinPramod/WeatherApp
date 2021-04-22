import React, {useState} from 'react';
import './App.css';
const api =  {key:'3243d7082a30a10ac6b36263809994c2',base:'https://api.openweathermap.org/data/2.5/'};

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    }
  }

  return (
    <div className={
      ( typeof weather.main != "undefined") ? ( (weather.main.temp > 20) ? ('app warm'):('app')) : ('app')
    }>
      <div className="main">
        <div className="search">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        { ( typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box text-center">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box text-center">
            <div className="temp">
              { Math.round(weather.main.temp)}&deg;C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('') }
      </div>
    </div>
  );
}

export default App;
