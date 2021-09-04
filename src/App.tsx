import React, { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import pokeApi from './services/pokeApi';
import IPagination from './types/IPagination';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

	const [results, setResults] = useState<IPagination>({
		count: 0,
		next: 'pokemon?limit=10&offset=200',
		previous: '',
		results: []
	});

	const [searchByName, setSearchByName] = useState('');
	const [searchByLocation, setSearchByLocation] = useState('');

	console.log(searchByName.length);

	const handleLoadPokemons = () => {

		pokeApi
			.get<IPagination>(results.next)
			.then(response => {

				setResults(prevState => {

					return {
						results: [...prevState.results, ...response.data.results],
						next: response.data.next,
						count: response.data.count,
						previous: response.data.previous,
					}
				});
			})
			.catch(error => {

				console.log(error);
			});
	}

	const handleSearchPokemonByName = () => {

		// pokeApi
		// 	.get<IPagination>(results.next)
		// 	.then(response => {

		// 		setResults(prevState => {

		// 			return {
		// 				results: [...prevState.results, ...response.data.results],
		// 				next: response.data.next,
		// 				count: response.data.count,
		// 				previous: response.data.previous,
		// 			}
		// 		});
		// 	})
		// 	.catch(error => {

		// 		console.log(error);
		// 	});
	}

	useEffect(() => handleLoadPokemons(), []);

	return (

		<>
			<input
				placeholder="Pesquisar por nome..."
				value={searchByName}
				onChange={event => setSearchByName(event.target.value)}
			/>

			<input
				placeholder="Pesquisar por localização..."
				value={searchByLocation}
				onChange={event => setSearchByLocation(event.target.value)}
			/>

			{
				searchByName.length > 0
					? <div>Lista resultado pesquisa</div>
					: <InfiniteScroll
						dataLength={results.results.length}
						next={handleLoadPokemons}
						hasMore={results.next.length ? true : false}
						loader={<h4>Loading...</h4>}
						endMessage={
							<p style={{ textAlign: 'center' }}>
								<b>Yay! You have seen it all</b>
							</p>
						}
					>
						{
							results.results.map((pokemon, index) => (
								<Pokemon pokemon={pokemon} key={index} />
							))
						}
					</InfiniteScroll>
			}


		</>
	);
}

export default App;