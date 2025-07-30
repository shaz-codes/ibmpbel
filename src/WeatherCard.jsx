import { useState, useEffect } from 'react';
import trashIcon from './trash.svg';

export function WeatherCard({ location, index, setlocations, locations }) {
	const key = import.meta.env.VITE_WEATHER_API_KEY;
	const [weatherData, setWeatherData] = useState(null);
	console.log(weatherData);

	const weather = async (lat, lon) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		weather(location.lat, location.lon)
			.then((data) => {
				setWeatherData(data);
			})
			.catch((error) => {
				console.error('Error fetching weather data:', error);
			});
	}, [location]);

	if (!weatherData) return <p>Loading...</p>;

	return (
		<div className='weather-card'>
			<button
				className='remove'
				onClick={(e) => {
					if (index === 0) {
						setlocations([]);
					} else {
						setlocations(locations.splice(index, 1));
					}
				}}
			>
				<img
					src={trashIcon}
					alt=''
				/>
			</button>
			<h2>
				{weatherData.name}, {weatherData.sys.country}
			</h2>
			<p>{weatherData.weather[0].description}</p>
			<p>Temperature: {weatherData.main.temp}°C</p>
			<p>Humidity: {weatherData.main.humidity}%</p>
			<p>Wind Speed: {weatherData.wind.speed} m/s</p>
			<p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toTimeString()}</p>
			<p>Sunset: {new Date(weatherData.sys.sunset * 1000).toTimeString()}</p>
		</div>
	);
}
