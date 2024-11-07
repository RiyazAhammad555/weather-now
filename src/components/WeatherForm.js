import React, { useState } from "react";
import axios from "axios";

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [searchCities, setSearchCities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setSearchCities([]);
    }
  };

  const onCityChange = async (e) => {
    setCity(e.target.value);
    if (e.target.value.trim()) {
      const cities = await axios.get(`http://api.weatherapi.com/v1/search.json?key=e668e9b859374576bb765451240711&q=${e.target.value}`);
      if (cities.data.length) {
        setSearchCities(cities.data);
      } else {
        setSearchCities([]);
      }
    } else {
      setSearchCities([]);
    }
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    setSearchCities([]);
    onSearch(cityName);
  };

  return (
    <div className="relative mb-4">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e)}
          placeholder="Enter city name"
          className="input input-bordered w-full mb-2"
        />
        <button type="submit" className="btn btn-primary w-40 ml-2">
          Get Weather
        </button>
      </form>
      
      {searchCities.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
          {searchCities.map((cityItem, index) => (
            <li
              key={index}
              onClick={() => handleCityClick(cityItem.name)}
              className="cursor-pointer hover:bg-gray-600 p-2 text-black"
            >
              {cityItem.name}, {cityItem.region}, {cityItem.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeatherForm;
