import React, { useState } from "react";
import axios from "axios";
import locationImg from "./assets/location.png";
import weatherIcon from "./assets/weatherIcon.png";
import vector1 from "./assets/Vector1.png";
import vector2 from "./assets/Vector2.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9cc4552d415c96e83447a7da02fe7682`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="input-container">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="card-body">
          <h4 className="title">Weather App</h4>
          <div className="location-box">
            <img src={locationImg} alt="Location Icon" />
            {data.name ? <p>{data.name}</p> : null}
          </div>
          <img src={weatherIcon} alt="Weather Icon" />
          {data.weather ? (
            <p className="info">{data.weather[0].description}</p>
          ) : null}
          {data.main ? (
            <h1 className="degree">{data.main.temp.toFixed() - 270} &deg;C</h1>
          ) : null}
        </div>
        <div className="card-footer">
          <div className="box">
            <div className="icon">
              <img src={vector1} alt="Vector" />
            </div>
            <div className="text">
              {data.main ? (
                <p>{data.main.feels_like.toFixed() - 270} &deg;C</p>
              ) : null}
              <span>Feels like</span>
            </div>
          </div>

          <div className="box">
            <div className="icon">
              <img src={vector2} alt="Vector" />
            </div>
            <div className="text">
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <span>Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
