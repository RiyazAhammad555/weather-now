import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading,setIsLoading]=useState(false)
  const [selectedCity,setSelectedCity]=useState('')
  const [type,setType]=useState('current')

  const getWeather =(city) => {
    setSelectedCity(city)
    setError(null);
    setIsLoading(true)
    setType('current')
    const getWeatherData=async()=>{
      try {
        
        const geocodeResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=e668e9b859374576bb765451240711&q=${city}`
        );
        setWeatherData(geocodeResponse.data.current);
        setLocationData(geocodeResponse.data.location)
        setIsLoading(false) 
      }catch (err) {
        setError("Failed to fetch weather data. Please try again.");
      }
    }
    setTimeout(getWeatherData,1000)
    };

  const getForecast=()=>{
    setError(null);
    setIsLoading(true)
    setType('forecast')
    const getForecastData=async()=>{
      try {
        const forecastResponse = await axios.get(
        `https://api.weatherapi.com/v1/marine.json?key=e668e9b859374576bb765451240711&q=${selectedCity}&days=7`
        );
        console.log('g',forecastResponse)
        setWeatherData(forecastResponse.data.forecast);
        setLocationData(forecastResponse.data.location)
        setIsLoading(false) 
      }catch (err) {
        setError("Failed to fetch weather data. Please try again.");
      }
    }
    setTimeout(getForecastData,1000)
  }

  const getCurrentWeather=()=>{
    getWeather(selectedCity)
  }

  return (
    <div className="min-h-screen bg-blue-100 flex-col justify-center items-center">
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Hello,Jaime</a>
        </div>
        <div class="flex-none gap-2">
          <div class="form-control">
            {/* <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" /> */}
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md p-6  m-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Weather Now
        </h1>
        <WeatherForm onSearch={getWeather} />
        {error && <ErrorMessage message={error} />}
      </div>
      { Object.keys(weatherData).length>0  && !isLoading&&

        <>
          <div className="flex justify-self-center items-center mb-2">
            <button type="btn" className="btn btn-primary w-40 ml-2" onClick={getCurrentWeather}>
              Current
            </button>
            <button type="submit" className="btn btn-warning w-40 ml-2" onClick={getForecast}>
              Forecast
            </button>
          </div>
          <WeatherCard data={weatherData} locationData={locationData} type={type} />
        </> 
      }
      {
        isLoading && 
        <div className="justify-self-center mt-auto">
        <span className="loading loading-dots loading-lg text-black mr-2"></span>
        <span className="loading loading-dots loading-lg text-black mr-2"></span>
        <span className="loading loading-dots loading-lg text-black mr-2"></span>
        <span className="loading loading-dots loading-lg text-black mr-2"></span>
        </div>
      }
    </div>
  );
}

export default App;
