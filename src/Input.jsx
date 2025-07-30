import { useState, useRef, useEffect } from 'react';

export function Input({ setlocations, locations }) {
	const key = import.meta.env.VITE_WEATHER_API_KEY;
	const [timeout, setTimeOut] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const inputRef = useRef();

	const geoCode = async (q) => {
		const response = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${key}`
		);
		return await response.json();
	};

	const mockGeoCode = async (q) => {
		return [
			{
				name: 'Lucknow',
				local_names: {
					ru: 'Лакхнау',
					tr: 'Leknev',
					en: 'Lucknow',
					zh: '勒克瑙',
					bn: 'লখনউ',
					pa: 'ਲਖਨਊ',
					eo: 'Laknaŭo',
					fa: 'لکهنو',
					ur: 'لکھنؤ',
					or: 'ଲକ୍ଷ୍ନୌ',
					hi: 'लखनऊ',
					ml: 'ലഖ്‌നൗ',
					he: 'לאקנאו',
					kn: 'ಲಖ್ನೌ',
					te: 'లక్నో',
					ar: 'لكنو',
					ta: 'இலக்னோ',
					uk: 'Лакнау',
					mr: 'लखनऊ',
					ja: 'ラクナウ',
					ne: 'लखनऊ',
					oc: 'Lakhnau',
				},
				lat: 26.8381,
				lon: 80.9346001,
				country: 'IN',
				state: 'Uttar Pradesh',
			},
			{
				name: 'Lucknow',
				lat: 56.4908492,
				lon: -2.7822517,
				country: 'GB',
				state: 'Scotland',
			},
			{
				name: 'Lucknow',
				lat: -33.3461647,
				lon: 149.1616971,
				country: 'AU',
				state: 'New South Wales',
			},
			{
				name: 'Lucknow',
				lat: 40.3275579,
				lon: -76.8861494,
				country: 'US',
				state: 'Pennsylvania',
			},
			{
				name: 'Lucknow',
				local_names: {
					fr: 'Lucknow',
				},
				lat: 43.961848,
				lon: -81.5172512,
				country: 'CA',
				state: 'Ontario',
			},
		];
	};

	const handleInputChange = (e) => {
		const value = e.target.value.trim();

		// Clear previous timeout
		if (timeout) {
			console.log('Clearing previous timeout');

			clearTimeout(timeout);
		}

		if (value === '') {
			setSearchResults([]);
			return;
		}

		// Set new timeout for debouncing
		const newTimeout = setTimeout(async () => {
			try {
				const data = await geoCode(value); // or mockGeoCode(value)
				setSearchResults(data);
			} catch (error) {
				console.error('Error fetching locations:', error);
				setSearchResults([]);
			}
		}, 1000);

		setTimeOut(newTimeout);
	};

	const handleLocationSelect = (loc) => {
		setlocations((prev) => [...prev, loc]);
		setSearchResults([]);
		inputRef.current.value = '';
	};

	useEffect(() => {
		inputRef.current?.focus();

		// Cleanup timeout on unmount
		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [timeout]);

	return (
		<div
			className='input'
			style={
				locations.length > 0
					? { top: '20px', transform: `translate(0,0)`, left: 'unset' }
					: {}
			}
		>
			<input
				ref={inputRef}
				type='text'
				placeholder='Enter city name'
				name='location'
				onChange={handleInputChange}
				style={{
					borderRadius: searchResults.length > 0 ? '25px 25px 0 0' : '25px',
				}}
			/>
			<div className='options'>
				{searchResults.map((loc, index) => (
					<div
						key={`${loc.lat}-${loc.lon}-${index}`}
						className='option'
						onClick={() => handleLocationSelect(loc)}
						style={{ cursor: 'pointer' }}
					>
						{loc.name}, {loc.state}, {loc.country}
					</div>
				))}
			</div>
		</div>
	);
}
