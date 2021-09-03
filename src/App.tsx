import React, { useEffect, useState } from 'react';
import pokeApi from './services/pokeApi';
import Pokemon from './components/Pokemon';

interface IPokemon {
	name: string,
	url: string
}

interface IPagination {
	count: number,
	next: string,
	previous: string,
	results: Array<IPokemon>
}

function App() {

	const [results, setResults] = useState<IPagination>({
		count: 0,
		next: '',
		previous: '',
		results: []
	});

	useEffect(() => {

		pokeApi
			.get<IPagination>('pokemon?limit=10&offset=200')
			.then(response => {

				setResults(response.data);
				console.log(response.data);
			})
			.catch(error => {

				console.log(error);
			});
	}, []);

	return (
		<div className="App">
			{
				results.results.map((pokemon, index) => (
					<Pokemon pokemon={pokemon} key={index} />
				))
			}
		</div>
	);
}

export default App;
