import { AppBar, Box, Button, CircularProgress, Container, CssBaseline, Grid, MenuItem, TextField, Toolbar, useScrollTrigger } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SearchOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pokemon from './components/Pokemon';
import pokeApi from './services/pokeApi';
import IPagination from './types/IPagination';
import IPokemon from './types/IPokemon';
import { AsyncPaginate } from 'react-select-async-paginate';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		flexGrow: 1,
		fontFamily: 'Righteous, Raleway, Arial'
	},
	input: {
		margin: 10,
		maxWidth: 250,
		width: '100%'
	},
	container: {
		paddingTop: 20
	},
	selectArea: {
		maxWidth: 250,
		width: '100%',
		margin: 10
	},
	btnSearch: {
		padding: 8,
		minWidth: 30
	}
}));

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
		next: 'pokemon?limit=10&offset=200',
		previous: '',
		results: []
	});

	const [pokemon, setPokemon] = useState<IPokemon>({});
	const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
	const [typeSearch, setTypeSearch] = useState('default');
	const [search, setSearch] = useState('');
	const [area, setArea] = useState<any>({});

	async function loadOptions(loadedOptions: any) {

		const response = await pokeApi.get<any>(`location-area?offset=${loadedOptions.length}&limit=20`);
		const results = response.data.results.map((result: any) => {
			return {
				value: result.id,
				label: result.name
			}
		})
		return {
			options: results,
			hasMore: response.data.next,
		};
	}

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
	}, []);

	return (

		<React.Fragment>
			<CssBaseline />

			<div className={classes.root}>

				<AppBar position="fixed" color="inherit">
					<Toolbar>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Box display='flex' justifyContent="center" alignItems="center">

									<TextField
										className={classes.input}
										size="small"
										select
										label="Pesquisar por"
										value={typeSearch}
										onChange={event => setTypeSearch(event.target.value)}
										variant="outlined"
									>
										<MenuItem key="default" value="default">
											Todos
										</MenuItem>
										<MenuItem key="by-area" value="by-area">
											Localização
										</MenuItem>
										<MenuItem key="by-name" value="by-name">
											Nome
										</MenuItem>
									</TextField>

									{
										typeSearch === 'by-area'
											? <AsyncPaginate
												className={classes.selectArea}
												value={area}
												loadOptions={loadOptions}
												onChange={(area: any) => { setArea(area) }}
											/>
											: <TextField
												className={classes.input}
												size="small"
												placeholder="Pesquisar..."
												value={search}
												onChange={event => {
													setSearch(event.target.value)
												}}
												disabled={typeSearch === 'default'}
												label="Digite aqui..."
												type="search"
												variant="standard"
											/>
									}


									<Box display="flex" alignItems="center">
										<Button
											size="large"
											variant="contained"
											onClick={handleSearch}
											color="primary"
											className={classes.btnSearch}
										>
											<SearchOutlined />
										</Button>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
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