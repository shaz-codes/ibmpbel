import { useState } from 'react';
import './App.css';
import { WeatherCard } from './WeatherCard';
import { Input } from './Input';

function App() {
	const [locations, setlocations] = useState(
		localStorage.getItem('locations')
			? JSON.parse(localStorage.getItem('locations'))
			: []
	);
	console.log(locations);
	localStorage.setItem('locations', JSON.stringify(locations));

	return (
		<>
			<div className='name'>
				<h1>Weather App</h1>
				<h1>Shahnaz Bano</h1>
			</div>
			<Input
				setlocations={setlocations}
				locations={locations}
			/>
			<div className='locations'>
				{locations.map((loc, index) => (
					<WeatherCard
						key={index}
						location={loc}
						index={index}
						setlocations={setlocations}
						locations={locations}
					/>
				))}
			</div>
		</>
	);
}

export default App;
