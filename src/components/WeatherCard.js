import React from 'react';
import { FaWind, FaTint, FaCloud, FaSun, FaMoon } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,  
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeatherCard = ({ data, locationData, type }) => {
    console.log('loc data', locationData)
    const isDay = data.is_day;
    const cardBackground = isDay ? "bg-blue-500" : "bg-gray-800";
    const textColor = isDay ? "text-blue-900" : "text-white";
    const iconColor = isDay ? "text-yellow-300" : "text-gray-200";

    let chartData, chartOptions;
    if (type === 'forecast') {
        chartData = {
            labels: type === 'forecast' ? data.forecastday.map(day => day.date) : [],  //x-axis
            datasets: [
                {
                    label: 'Avg Temperature (°C)',
                    data: type === 'forecast' ? data.forecastday.map(day => day.day.avgtemp_c) : [],  //Avg temperature for each day
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };

        chartOptions = {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                },
            },
        };
    }

    return (
        <>
            {type === 'current' &&
                <div className={`${cardBackground} text-center p-6 rounded-xl shadow-lg h-full w-full flex flex-col justify-between items-center`}>
                    {/* Weather Info Section */}
                    <div className="text-center">
                        <h2 className={`text-2xl font-semibold ${textColor}`}>
                            Current Weather in {locationData.name}, {locationData.country}
                        </h2>
                        <p className="text-md text-gray-300">
                            Date and Time: {locationData.localtime}
                        </p>
                        <p className="flex items-center justify-center mt-2">
                            {isDay ? <FaSun size={24} className={iconColor} /> : <FaMoon size={24} className={iconColor} />}
                            <span className="ml-2 text-xl">{data.condition.text}</span>
                        </p>
                        <img
                            src={data.condition.icon}
                            alt={data.condition.text}
                            className="mx-auto mt-3 w-16 h-16"
                        />
                    </div>

                    {/* Current Temperature and Additional Info */}
                    <div className="text-center mt-4">
                        <p className={`text-5xl font-bold ${textColor}`}>{data.temp_c}°C</p>
                        <p className="text-gray-300">Feels like {data.feelslike_c}°C</p>
                        <div className="mt-4 flex justify-center space-x-6 text-lg">
                            <div className="flex items-center">
                                <FaWind size={20} className="text-gray-400 mr-1" />
                                <p>{data.wind_kph} km/h</p>
                            </div>
                            <div className="flex items-center">
                                <FaTint size={20} className="text-blue-300 mr-1" />
                                <p>{data.humidity}%</p>
                            </div>
                            <div className="flex items-center">
                                <FaCloud size={20} className="text-gray-400 mr-1" />
                                <p>{data.cloud}% Cloud</p>
                            </div>
                        </div>
                    </div>

                    {/* Extra Info (Pressure, Visibility, UV Index) */}
                    <div className="text-center mt-6 space-y-2">
                        <p className="text-gray-300">Pressure: {data.pressure_mb} mb</p>
                        <p className="text-gray-300">Visibility: {data.vis_km} km</p>
                        <p className="text-gray-300">UV Index: {data.uv}</p>
                    </div>
                </div>
            }

            {/* Forecast Chart Section*/}
            {type === 'forecast' && (
                <div className="mt-6 w-[50%]  h-[350px] bg-white rounded-xl justify-self-center">
                    <Line
                        data={chartData}
                        options={{
                            ...chartOptions,
                            responsive: true,  // Ensure responsiveness
                            maintainAspectRatio: false,  // Allow custom height for the chart
                        }}
                    />
                </div>
            )}

        </>


    );
};

export default WeatherCard;
