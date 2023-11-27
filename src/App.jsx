import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { cloudy } from "../src/components/cloudy.jpg";
import { rainy } from "../src/components/rainy.gif";
import { snowy } from "../src/components/snowy.jpg";
import { sunny } from "../src/components/sunny.jpg";
import { windy } from "../src/components/windy.jpg";
import { sunset } from "../src/components/sunset.jpg";


function App() {
  const [data, setdata] = useState({})
  const [location, setlocation] = useState('')


  // Fetch data from the openweathermap API

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=2308bcab6915b249a6e30c3d3da9459f`


  const searchlocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setdata(response.data)
          // console.log(response.data);
        })
      setlocation(' ');

    }
    // Set a condition for the background image

    let condition = data.weather[0].main;
    
    let backgroundImage = null;

    // Select images based on condition
    switch (props.condition.toLowerCase()) {

      case 'Clouds':
            backgroundImage = { cloudy };
            break;
      case 'Rain':
            backgroundImage = { rainy };
            break;
      case 'Snow': 
            backgroundImage = { snowy }; 
            break;
      case 'Clear': 
            backgroundImage = { sunny };
            break;
      case 'Windy': 
            backgroundImage = { windy };
            break;
      default: 
            backgroundImage = { sunset };



      // const body = document.body
      //   body.styleSheets.backgroundImage ="url('/components/cloudy.jpg')"
    }
  };

}

return (
  <div className="app">

    {/* ---------serach bar-----------  */}
    <div className="search">


      <input onChange={event => setlocation(event.target.value)} type="text" name="city" placeholder='Enter Location' onKeyUp={searchlocation} id="" />
    </div>

    {/* ---------main container-----------  */}
    <div className="container">
      <div className="top">

        <div className="location">
          <p>{data.name}</p>
        </div>

        <div className="temp">

          {data.main ? <h1> {data.main.temp.toFixed()}°F</h1> : null}

        </div>

        <div className="descprition">
          {data.weather ? <p> {data.weather[0].main}</p> : null}
        </div>
      </div>


      {/* ------------------bottom----------------------  */}

      {data.main !== undefined &&

        <div className="bottom">

          <div className="feels">
            {data.main ? <p className='bold'> {data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>

          <div className="humudity">
            {data.main ? <p className='bold'> {data.main.humidity}%</p> : null}
            <p>Humudity</p>
          </div>

          <div className="wind">
            {data.wind ? <p className='bold'> {data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind Speed</p>
          </div>

        </div>
      }

    </div>

  </div>
);
}

export default App;
