import { CircularProgress, Container, CssBaseline, Grid, Toolbar, useScrollTrigger } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pokemon from './components/Pokemon';
import SearchBar from './components/SearchBar';
import useStyles from './styles';
import pokeApi from './services/pokeApi';
import IPagination from './types/IPagination';
import IPokemon from './types/IPokemon';

function ElevationScroll({ children, window }: any) {

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

const App = () => {

	const classes = useStyles();

	const [results, setResults] = useState<IPagination>({
		count: 0,
		next: 'pokemon?limit=10&offset=0',
		previous: '',
		results: []
	});

	const [pokemon, setPokemon] = useState<IPokemon>({});
	const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
	const [typeSearch, setTypeSearch] = useState('default');
	const [search, setSearch] = useState('');
	const [area, setArea] = useState<any>({});

	const handleSearchPokemonsByDefault = () => {

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

		pokeApi
			.get<any>(`pokemon/${search}`)
			.then(response => {

				setPokemon({
					name: response.data.name,
					url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
				});
			})
			.catch(error => {

				setPokemon({});
				console.log(error);
			});
	}

	const handleSearchPokemonByLocationArea = () => {	

		console.log(area);		

		if (area.hasOwnProperty('label')) {
			
			pokeApi
				.get<any>(`location-area/${area.label}`)
				.then(response => {
	
					const pokemonsEncounters = response.data.pokemon_encounters.map((pokemonItem: any) => pokemonItem.pokemon);
					setPokemons(pokemonsEncounters);
				})
				.catch(error => {
	
					setPokemons([]);
					console.log(error);
				});
		}
	}

	const handleSearch = () => {

		if (typeSearch === 'by-area' && Object.keys(area).length > 0) {

			handleSearchPokemonByLocationArea();
		} else if (typeSearch === 'by-name' && search.length > 0) {

			handleSearchPokemonByName();
		} else if (typeSearch === 'default') {

			handleSearchPokemonsByDefault();
		}
	}

	useEffect(() => {
		
		handleSearch();
		// eslint-disable-next-line
	}, []);

	return (

		<React.Fragment>
			<CssBaseline />

			<div className={classes.root}>

				<SearchBar 
					typeSearch={typeSearch}
					setTypeSearch={setTypeSearch}
					search={search}
					setSearch={setSearch}
					area={area}
					setArea={setArea}
					handleSearch={handleSearch}
				/>

				<Toolbar />
				<Container maxWidth="lg" className={classes.container}>

					{
						typeSearch === 'default'
						&& <InfiniteScroll
							style={{ overflow: 'inherit' }}
							dataLength={results.results.length}
							next={handleSearchPokemonsByDefault}
							hasMore={results.next.length ? true : false}
							loader={<CircularProgress />}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
						>
							<Grid container spacing={3}>
								{
									results.results.map((pokemon, index) => (
										<Pokemon pokemon={pokemon} key={index} />
									))
								}
							</Grid>
						</InfiniteScroll>
					}
					<Grid container spacing={3}>

						{
							typeSearch === 'by-name'
							&& (
								Object.keys(pokemon).length
									? <Pokemon pokemon={pokemon} />
									: <p>Nenhum pokemon encontrado para o nome "{search}"</p>
							)
						}

						{
							typeSearch === 'by-area'
							&& (
								pokemons.length
									? pokemons.map((pokemon, index) => <Pokemon pokemon={pokemon} key={index} />)
									: <p>Nenhum pokemon encontrado para área "{search}"</p>
							)
						}
					</Grid>
				</Container>
			</div >
		</React.Fragment>
	);
}

export default App;